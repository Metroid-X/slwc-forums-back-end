const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');

const verifyToken = require('../middleware/verify-token');

// GET ALL
router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find({}, 'userId displayName bio avatar linkedImages commentsPosted topicsPosted catchphrase');

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// SHOW ONE
router.get('/:profileId', async (req,res) => {
    try {
        const profileDisplay = await Profile.findById(req.params.profileId);
        console.log()
        res.json(profileDisplay);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// UPDATE ONE
router.put('/:profileId/edit', verifyToken, async (req,res) => {
    try {
        const profileDisplay = await Profile.findByIdAndUpdate(
            req.params.profileId,
            {
                displayName: req.body.displayName,
                avatar: req.body.avatar,
                bio: req.body.bio,
                dateUpdated: Date.now(),
            },
            {
                new: true,
            }
        );
        res.json(profileDisplay);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;