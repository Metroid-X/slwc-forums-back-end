const express = require('express');
const router = express.Router();
const app = express();

const { User } = require('../models/user');
const { Profile } = require('../models/user');
const { Comment } = require('../models/forum');

const verifyToken = require('../middleware/verify-token');

router.get('/', async (req,res) => {
    try {
        const comments = await Comment.find()
        res.json(comments);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// CREATE
router.post('/new', verifyToken, async (req, res) => {
    try {
        const comment = await Comment.create({
            userId: req.user.profile,
            topicId: req.body.topicId,
            body: req.body.commentBody,
            linkedImages: [...req.body.linkedImages.split(' ')],
            datePosted: Date.now(),
        });

        res.status(201).json(comment);

    } catch (err) {
        res.status(500).json({ err: err.message });
    };
});


// UPDATE
router.put('/update/:commentId', verifyToken, async (req, res) => {
    try {

        const comment = await Comment.findByIdAndUpdate(req.params.commentId,
            {
                topicId: req.body.topicId,
                body: req.body.commentBody,
                linkedImages: [...req.body.linkedImages.split(' ')],
                dateUpdated: Date.now(),
            },
            {
                new: true,
            }
        );

        if (!comment) {
            res.status(404);
            throw new Error('Comment not found.');
        };


        res.status(200).json(comment);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});


// DELETE
router.delete('/delete/:commentId', verifyToken, async (req, res) => {
    try {
        
        const deletedComment = await Comment.findByIdAndDelete(
            req.params.commentId
        );
        
        if (!deletedComment) {
            res.status(404);
            throw new Error('Comment not found.');
        };

        res.status(200).json( deletedComment);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        };
    };
});

module.exports = router;