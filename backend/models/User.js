const mongoose = require('mongoose');
const {compare, genSalt, hash} = require('bcrypt');
const {nanoid} = require('nanoid');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateNameUnique = async value => {
    const user = await User.findOne({username: value});

    if (user) return false;
};

const validateMailUnique = async value => {
    const user = await User.findOne({email: value});

    if (user) return false;
};

const validateMaxLength = async value => {
    const length = value.length > 4;

    if (length) return false;
};


const validateEmail = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength:[6, 'Пароль должен содержать минимум 6 символов']
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: validateEmail,
            message: 'Введите правильную почту'
        }, {
            validator: validateMailUnique,
            message: 'Пользователь с такой почтой уже существует.'
        }],
    },
    pin: {
      type: String,
      validate: {
          validator: validateMaxLength,
          message: "Пин-код должен быть не больше 4 цифр"
      }
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
    isFired: {
        type:Boolean,
        default: false,
    },
    displayName: String,
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(SALT_WORK_FACTOR);
    this.password = await hash(this.password, salt);

    next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
    if (!this._update.password) return next();
    const salt = await genSalt(SALT_WORK_FACTOR);
    this._update.password = await hash(this._update.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;