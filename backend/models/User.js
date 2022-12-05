const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({username: value});

    if (user) return false;
};

const validateEmail = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateUnique,
            message: 'Этот пользователь уже зарегистрирован',
        }
    },
    password: {
        type: String,
        required: true,
        minLength:[6, 'Пароль должен содержать минимум 6 символов']
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: 'Введите правильную почту'
        },
    },
    pin: {
      type: String,
      max: 4,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['cashier', 'admin'],
    },
    displayName: String
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
    if (!this._update.password) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this._update.password = await bcrypt.hash(this._update.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;