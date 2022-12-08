const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const adminInfo = await User.findOne({role: {$eq: 'admin'}});

        if (!adminInfo) {
            return res.status(404).send({message: 'Admin info not found!'});
        }

        res.send(adminInfo);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/', auth, permit('admin'), async (req, res) => {
    const {displayName, email, username} = req.body;

    const profileData = {
        displayName,
        email,
        username
    };

    try {
        const adminInfo = await User.findOne(req.user);

        if (!adminInfo) {
            return res.status(404).send({message: 'Admin info not found!'});
        }
        const updateProfile = await User.updateOne(adminInfo, profileData);
        res.send(updateProfile);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/password', auth, permit('admin'), async (req, res) => {
    const {oldPassword, newPassword, newPasswordRepeat} = req.body;

    if (newPassword !== newPasswordRepeat) {
        return res.send({error: 'Пароли не совпадают!'});
    }

    try {
        const user = await User.findOne(req.user);
        const isMatch = await user.checkPassword(oldPassword);

        if (!isMatch) {
            return res.status(401).send({error: 'Неправильный старый пароль!'});
        }

        user.password = newPassword;
        await user.save({validateBeforeSave: false});
        res.send({message: 'Пароль успешно изменен!'});
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports = router;