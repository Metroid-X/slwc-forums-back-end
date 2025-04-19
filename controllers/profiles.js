const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');

const verifyToken = require('../middleware/verify-token');

router.get('/', verifyToken, async (req,res) => {
    try {
        const users = await User.find({}, 'commentsPosted topicsPosted username profile linkedImages');

        const profiles = await Profile.find({}, 'userId bio avatar');

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;