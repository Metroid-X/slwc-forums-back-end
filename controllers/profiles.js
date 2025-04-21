const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');

const verifyToken = require('../middleware/verify-token');

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find({}, 'userId bio avatar linkedImages commentsPosted topicsPosted catchphrase');

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.get('/:userName', verifyToken, async (req,res) => {
    try {
        const profileUser = await User.findOne({username: req.params.userName})
        const profileDisplay = await Profile.findOne({userId: profileUser._id})

        res.json({profileUser, profileDisplay});
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.post('/:userName/edit', verifyToken, async (req,res) => {
    try {
        const profileUser = await User.findOne({ username: req.params.userName });
        const user = await User.findById(req.user._id);
        const profile = await Profile.findById(user.profile);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;