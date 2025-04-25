const express = require('express');
const router = express.Router();
const app = express();

const { mongoose, Schema } = require('../homebrew-funcs')

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Topic, Comment, Forum } = require('../models/forum');
const { Image } = require('../models/image');
const verifyToken = require('../middleware/verify-token');


// GET ALL
router.get('/get', async (req,res) => {
    try {
        const branches = await Forum.find();

        const topics = await Topic.find();

        res.status(200).json(topics);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// GET ALL WITHIN BRANCH
router.get('/get/:branchName', async (req,res) => {
    try {
        const branch = await Forum.findOne({name: req.params.branchName});
        const topics = await Topic.find({ forumId: branch._id, });
        
        if (!branch) {
            res.status(404);
            throw new Error('Branch not found.');
        };

        res.status(200).json({ branch, topics });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});


// SHOW ONE
router.get('/get/:branchName/:topicId', async (req,res) => {
    try {
        const branch = await Forum.findOne({ name: req.params.branchName });
        const topic = await Topic.findOne({ _id: req.params.topicId });
        const topicComments = await Comment.find({
            topicId: req.params.topicId,
        });
        const profile = await Profile.findById(topic.userId);
        const topicTags = topic.tags;
        
        if (!branch) {
            res.status(404);
            throw new Error('Branch not found.');
        };

        if (!topic) {
            res.status(404);
            throw new Error('Topic not found.');
        };

        res.status(200).json({ branch, topic, topicComments, profile, topicTags, });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});


// CREATE
router.post('/new', verifyToken, async (req, res) => {
    // try {
        const branch = await Forum.findOne({ name: req.body.forumName });

        const topic = await Topic.create({
            userId: req.user.profile,
            title: req.body.title,
            description: req.body.desc,
            linkedImages: (req.body.linkedImages!=='')?
            ([...req.body.linkedImages.split(' ')]):([]),
            datePosted: Date.now(),
            followers: [req.user.profile],
            forumName: req.body.forumName,
            forumId: branch._id,
            tags: (req.body.tags!=='')?
            ([...req.body.tags.split(' ')]):([]),
        });

        res.status(201).json({ branch, topic });

    // } catch (err) {
    //     res.status(500).json({ err: err.message });
    // };
});


// UPDATE
router.put('/update/:topicId', verifyToken, async (req, res) => {
    try {

        const topic = await Topic.findByIdAndUpdate(req.params.topicId,
            {
                title: req.body.title,
                description: req.body.desc,
                linkedImages: [...req.body.linkedImages.split(' ')],
                dateUpdated: Date.now(),
                tags: (req.body.tags!=='')?
                ([...req.body.tags.split(' ')]):([]),
            },
            {
                new: true,
            }
        );

        const branch = await Forum.findById(topic.forumId);

        
        if (!topic) {
            res.status(404);
            throw new Error('Topic not found.');
        };


        res.status(200).json({ branch, topic, bodyComment });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});


// DELETE
router.delete('/delete/:topicId', verifyToken, async (req, res) => {
    try {
        
        const deletedComments = await Comment.deleteMany({
            topicId: req.params.topicId
        });

        const deletedTopic = await Topic.findByIdAndDelete(
            req.params.topicId
        );
        
        const branch = await Forum.findById(deletedTopic.forumId);

        if (!deletedTopic) {
            res.status(404);
            throw new Error('Topic not found.');
        };

        res.status(200).json({ branch, deletedTopic, deletedComments });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});

module.exports = router;