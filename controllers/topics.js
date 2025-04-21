const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Topic } = require('../models/forum');

router.get('/', async (req,res) => {
    try {
        const topics = await Topic.find()
        res.json(topics);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;