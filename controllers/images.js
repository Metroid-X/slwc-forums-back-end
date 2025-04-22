const express = require('express');
const router = express.Router();
const app = express();

const { Image } = require('../models/image');
const verifyToken = require('../middleware/verify-token');

router.get('/', async (req,res) => {
    try {
        const images = await Image.find()
        res.json(images);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.post('/new', verifyToken, async (req, res) => {
    try {
        const image = await Image.create({
            userId: req.user.profile,
            title: req.body.title,
            datePosted: Date.now(),
            usersFollowing: [req.user.profile],
            forumName: req.body.forumName,
        });

        res.status(201).json(image);
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

module.exports = router;