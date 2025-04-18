const { Schema , model } = require('../homebrew-funcs.js');

// const { ImageSchema } = require('./image.js');



const CommentSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attatchedImages: [String]
});

const TopicSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attatchedImages: [String],
    comments: [CommentSchema],
});

const ForumSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topics: [TopicSchema],
});


CommentSchema.set('toJSON', {});

TopicSchema.set('toJSON', {});

ForumSchema.set('toJSON', {});

const Comment = model('Comment', CommentSchema);
const Topic = model('Topic', TopicSchema);
const Forum = model('Forum', ForumSchema);

module.exports = { Forum, ForumSchema, Topic, TopicSchema, Comment, CommentSchema };