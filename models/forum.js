const { Schema , model } = require('../homebrew-funcs.js');

// const { ImageSchema } = require('./image.js');



const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attatchedImages: [String],
    forumId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
    },
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
});

CommentSchema.set('toJSON', {});

const Comment = model('Comment', CommentSchema);

const TopicSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attatchedImages: [String],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    }],
    forumId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
    },
});

TopicSchema.set('toJSON', {});

const Topic = model('Topic', TopicSchema);

const ForumSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    }],
});

ForumSchema.set('toJSON', {});

const Forum = model('Forum', ForumSchema);

module.exports = { Forum, ForumSchema, Topic, TopicSchema, Comment, CommentSchema };