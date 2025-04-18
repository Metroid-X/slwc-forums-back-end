const { Schema , model } = require('../homebrew-funcs.js');

const { ForumSchema , TopicSchema , CommentSchema } = require('./forum.js');


const ImageSchema = new Schema({
    originalPosterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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