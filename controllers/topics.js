const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Topic, Comment } = require('../models/forum');
const { Image } = require('../models/image');
const verifyToken = require('../middleware/verify-token');

router.get('/', async (req,res) => {
    try {
        const topics = await Topic.find()
        res.json(topics);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.post('/:branchId/new', verifyToken, async (req, res) => {
    try {

        const topic = await Topic.create({
            userId: req.user.profile,
            title: req.body.title,
            description: req.body.desc,
            forumId: req.params.branchId,
            datePosted: Date.now(),
            usersFollowing: (req.body.followThis ? ( [req.user.profile] ) : ( [] )),
        });

        let images = [];

        const imgFinalLength = await req.body.linkedImages.split(' ').length;

        req.body.linkedImages.split(' ').forEach(imgURL => {
            const imageInDatabase = Image.findOne({imageURL: imgURL});

            if(imageInDatabase) {
                images.push(imageInDatabase._id);
            } else {
                const tmpImg = Image.create({
                    userId: req.user.profile,
                    imageURL: imgURL,
                    datePosted: Date.now(),
                });
                images.push(tmpImg._id);
            };
        });

        if (images.length === imgFinalLength) {
            const bodyComment = await Comment.create({
                body: req.body.bodyContent,
                linkedImages: images,
                topicId: topic._id,
                datePosted: Date.now(),
            });

            topic.comments = [bodyComment._id];

            if (bodyComment && topic.comments) {
                res.status(201).json({});
            };
        };
        
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});

module.exports = router;