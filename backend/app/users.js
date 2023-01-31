const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const router = express.Router();

router.get('/:id',auth,permit('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, permit('admin'), async (req, res) => {
    const {username, password, displayName, pin, role, email} = req.body;
    const userData = {username, password, displayName, email, pin, role};

    try {
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(401).send({error: 'Неправильный логин или пароль!'});
    }

    if (user.isFired) {
        return res.status(401).send({error: 'Неправильный логин или пароль!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({error: 'Неправильный логин или пароль!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Username and password correct!', user})
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

// reset-password //

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/forgot-password', async (req, res) => {
   const { email } = req.body;

   try {
       const user = await User.findOne({email});

       if (!user) {
           return res.status(404).send({message: "Пользователь с данной почтой не найден."});
       }

       const secret = JWT_SECRET + user.password;
       const payload = {
           email: user.email,
           id: user._id
       };
       const token = jwt.sign(payload, secret, {expiresIn: '10m'});

       const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

       const mailOptions = {
           from: "taitai.software@gmail.com",
           to: email,
           subject: "Reset Password",
           html: `<h3>Тай Тай</h3> <p>Для того чтобы сбросить свой пароль, перейдите по ссылке: <br> ${link}</p> <p>Если это не вы, то просто проигнорируйте это письмо.</p>`
       }

       transporter.sendMail(mailOptions);
       res.send('Ссылка для сброса пароля была отправлена на почту: ' + email);

   } catch (e) {
        res.status(401).send(e);
   }
});
router.post('/reset-password/:id/:token', async (req, res) => {
    const {id, token} = req.params;
    const {password, password1} = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({error: "Пользователь не найден."});
        }

        if (password !== password1) {
            return res.status(400).send({message: "Пароли не совпадают!"});
        }

        const secret = JWT_SECRET + user.password;

        jwt.verify(token, secret);

        user.password = password;
        await user.save({validateBeforeSave: false});

        res.send({message: "Пароль успешно изменен!"});
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;