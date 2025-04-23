const { Schema , model } = require('../homebrew-funcs.js');

const { ForumSchema , TopicSchema , CommentSchema } = require('./forum.js');


const ImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
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
    dateUpdated: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    uploadByUser: {
        type: Boolean,
        required: true,
        default: false,
    },
    tags: {
        type: [String],
        required: false,
    },
})

ImageSchema.set('toJSON', {
    
});


const Image = model('Image', ImageSchema);

module.exports = { Image, ImageSchema };