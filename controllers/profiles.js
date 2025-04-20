const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');

const verifyToken = require('../middleware/verify-token');

router.get('/', async (req,res) => {
    try {
        const users = await User.find({}, 'username profile');

        const profiles = await Profile.find({}, 'userId bio avatar linkedImages commentsPosted topicsPosted catchphrase');

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.get('/:profileId', async (req,res) => {
    try {
        const profile = await Profile.findById(req.params.profileId);
        
        const user = await User.findById(profile.userId);
        
        res.json(profile);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;