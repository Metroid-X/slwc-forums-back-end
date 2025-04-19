const { Schema , model } = require('../homebrew-funcs.js');

const { ForumSchema , TopicSchema , CommentSchema } = require('./forum.js');


const ImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
    commentid: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

ImageSchema.set('toJSON', {
    
});


const Image = model('Image', ImageSchema);

module.exports = { Image, ImageSchema };