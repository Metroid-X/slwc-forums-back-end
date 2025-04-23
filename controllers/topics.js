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
        const forums = await Forum.find();

        const topics = await Topic.find();

        res.json(topics);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// GET ALL WITHIN BRANCH
router.get('/get/:branchName', async (req,res) => {
    // try {
        const branch = await Forum.findOne({name: req.params.branchName});
        const topics = await Topic.find({ forumId: branch._id, });
        
        res.json({ branch, topics });
    // } catch (err) {
    //     res.status(500).json({ err: err.message });
    // }
});


// SHOW ONE
router.get('/get/:branchName/:topicId', async (req,res) => {
    try {
        const topic = await Topic.findOne({ _id: req.params.topicId });
        const branch = await Forum.findById(topic.forumId);
        const topicComments = await Comment.find({
            topicId: req.params.topicId,
        });
        const profile = await Profile.findById(topic.userId);
        const bodyComment = await Comment.findOne({
            topicId: req.params.topicId,
            isTopicBody: true,
        });

        const result = { branch, topic, topicComments, profile, bodyComment };
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


// CREATE
router.post('/new', verifyToken, async (req, res) => {
    // try {
        const branch = await Forum.findOne({ name: req.body.forumName });

        const topic = await Topic.create({
            userId: req.user.profile,
            title: req.body.title,
            datePosted: Date.now(),
            followers: [req.user.profile],
            forumName: req.body.forumName,
            forumId: branch._id,
            tags: (req.body.tags!=='')?([...req.body.tags.split(' ')]):([]),
        });

        const bodyComment = await Comment.create({
            isTopicBody: true,
            userId: req.user.profile,
            body: req.body.bodyContent, 
            datePosted: Date.now(),
            topicId: topic._id,
            linkedImages: [...req.body.linkedImages.split(' ')],
        });

        res.status(201).json({ branch, topic, bodyComment });

    // } catch (err) {
    //     res.status(500).json({ err: err.message });
    // };
});


// CREATE COMMENT
router.post('/get/:topicId', verifyToken, async (req, res) => {
    try {
        const branch = await Forum.findOne({ name: req.body.forumName })

        const topic = await Topic.create({
            userId: req.user.profile,
            title: req.body.title,
            datePosted: Date.now(),
            followers: [req.user.profile],
            forumName: req.body.forumName,
            forumId: branch._id,
            tags: (req.body.tags!=='')?([...req.body.tags.split(' ')]):([]),
        });

        const bodyComment = await Comment.create({
            isTopicBody: true,
            userId: req.user.profile,
            body: req.body.bodyContent,
            datePosted: Date.now(),
            topicId: topic._id,
            linkedImages: [...req.body.linkedImages.split(' ')],
        })

        res.status(201).json({ branch, topic, bodyComment });


    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});


// UPDATE
router.put('/update/:topicId', verifyToken, async (req, res) => {
    // try {

        const topic = await Topic.findByIdAndUpdate(req.params.topicId,
            {
                title: req.body.title,
                dateUpdated: Date.now(),
                tags: (req.body.tags!=='')?([...req.body.tags.split(' ')]):([]),
            },
            {
                new: true,
            }
        );

        const branch = await Forum.findById(topic.forumId);

        const bodyComment = await Comment.findOneAndUpdate({
                topicId: req.params.topicId,
                isTopicBody: true,
            },
            {
                body: req.body.bodyContent,
                dateUpdated: Date.now(),
                linkedImages: [...req.body.linkedImages?(req.body.linkedImages):('').split(' ')],
            },
            {
                new: true,
            }
        )


        res.status(200).json({ branch, topic, bodyComment });
    // } catch (err) {
    //     res.status(500).json({ err: err.message });
    // };
});


// DELETE
router.delete('/delete/:topicId', verifyToken, async (req, res) => {
    try {
        
        const deletedComments = await Comment.deleteMany({
            topicId: req.params.topicId
        })

        const deletedTopic = await Topic.findByIdAndDelete(
            req.params.topicId
        )
        
        const branch = await Forum.findById(deletedTopic.forumId);

        res.status(201).json({ branch, deletedTopic, deletedComments });
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

module.exports = router;