const { Schema , model } = require('../homebrew-funcs.js');

// const { ImageSchema } = require('./image.js');



const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    linkedImages: {
        type: Array,
        required: false,
        default: [],
    },
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
    linkedImages: {
        type: Array,
        required: false,
        default: [],
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
    forumName: {
        type: String,
        required: true,
    },
    forumId: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'Profile',
        required: false,
        default: [],
    },
    tags: {
        type: [String],
        required: false,
        default: [],
    },
});

TopicSchema.set('toJSON', {});

const Topic = model('Topic', TopicSchema);

const ForumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

ForumSchema.set('toJSON', {});

const Forum = model('Forum', ForumSchema);

module.exports = { Forum, ForumSchema, Topic, TopicSchema, Comment, CommentSchema };