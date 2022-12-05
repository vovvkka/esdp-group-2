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


module.exports = router;