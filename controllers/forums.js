const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Forum, Topic } = require('../models/forum');

router.get('/', async (req,res) => {
    try {
        const forums = await Forum.find();
        res.json(forums);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// this may later be used in place of the current front-end method of forum-specific conditional topic-rendering
router.get('/:branchName', async (req,res) => {
    try {

        res.json({});
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;