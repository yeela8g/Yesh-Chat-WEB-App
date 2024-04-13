const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPassName = new Schema(
    {
        'username': {
            type: String,
            required: true
        },
        'password': {
            type: String,
            required: true
        },
        'displayName': {
            type: String,
            required: true
        },
        'profilePic': {
            type: String,
            required: true
        }
    }
);

const User = new Schema(
    {
        'username': {
            type: String,
            required: true
        },
        'displayName': {
            type: String,
            required: true
        },
        'profilePic': {
            type: String,
            required: true
        }
    }
);

module.exports = {
    'UserPassName': mongoose.model('UserPassName', UserPassName),
    'User': mongoose.model('User', User)
};