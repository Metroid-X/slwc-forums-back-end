const { Schema , model } = require('../homebrew-funcs.js');

const { ImageSchema } = require('./image.js');
const { TopicSchema , CommentSchema } = require('./forum.js');


const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    displayName: {
        type: String,
        required: false,
        default: '',
    },
    bio: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
    },
    catchphrase: {
        type: String,
        required: false,
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'Profile',
        required: false,
        default: [],
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'Profile',
        required: false,
        default: [],
    },
})

ProfileSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    }
});

const Profile = model('Profile', ProfileSchema);


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
})


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

const User = model('User', UserSchema);

module.exports = { User, UserSchema, Profile, ProfileSchema };