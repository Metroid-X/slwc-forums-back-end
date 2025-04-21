const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Comment } = require('../models/forum');

router.get('/', async (req,res) => {
    try {
        const comments = await Comment.find()
        res.json(comments);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;