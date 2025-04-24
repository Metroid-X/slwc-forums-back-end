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
    };
});


router.get('/:branchName', async (req,res) => {
    try {
        const branch = await Forum.findOne({ name: req.params.branchName });

        if (!branch) {
            res.status(404);
            throw new Error('Branch not found.');
        };

        res.status(200).json(branch);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});

router.get('/:branchName/for-new-topic', async (req,res) => {
    try {
        const foundBranch = await Forum.findOne({ name: req.params.branchName });

        const branch = (foundBranch)?(foundBranch):({});

        res.status(200).json(branch);
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

router.get('/search/query', async (req,res) => {
    try {

        
        if (req.query.t) {
            const topicsResult = await Topic.find()
            .where('tags').all(req.query.t?req.query.t:''.split(' '));
            res.status(200).json(topicsResult);
        } else {
            const topicsResult = await Topic.find();
            res.status(200).json(topicsResult);
        }
    
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

router.get('/search/test', async (req,res) => {
    try {

        const result = req.query

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

module.exports = router;