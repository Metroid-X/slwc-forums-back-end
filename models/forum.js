const { Schema , model } = require('../homebrew-funcs.js');

// const { ImageSchema } = require('./image.js');



const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    linkedImages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
            required: true,
        }
    ],
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    dateUpdated: {
        type: Date,
        required: false,
    },
});

CommentSchema.set('toJSON', {});

const Comment = model('Comment', CommentSchema);

const TopicSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagesPosted: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
            required: true,
        }
    ],
    forumId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            required: true,
        }
    ],
    datePosted: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    dateUpdated: {
        type: Date,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    usersFollowing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        }
    ],
    forumName: {
        type: String,
        required: true,
    },
});

TopicSchema.set('toJSON', {});

const Topic = model('Topic', TopicSchema);

const ForumSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    topics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
        }
    ],
});

ForumSchema.set('toJSON', {});

const Forum = model('Forum', ForumSchema);

module.exports = { Forum, ForumSchema, Topic, TopicSchema, Comment, CommentSchema };