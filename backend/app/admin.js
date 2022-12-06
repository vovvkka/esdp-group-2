const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Contacts = require("../models/Contacts");
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


module.exports = router;