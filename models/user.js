const { Schema , model } = require('../homebrew-funcs.js');

const { ImageSchema } = require('./image.js');
const { TopicSchema , CommentSchema } = require('./forum.js');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
})


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

const User = model('User', UserSchema);

const ProfileSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bio: {
        type: String,
        required: false,
        default: '',
    },

})

ProfileSchema.set('toJSON', {
    transform: (document, returnedObject) => {

    }
});

const Profile = model('Profile', ProfileSchema);

module.exports = { User, UserSchema, Profile, ProfileSchema };