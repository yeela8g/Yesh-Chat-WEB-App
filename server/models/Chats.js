const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { User } = require('../models/Users.js');

const Message = new Schema(
    {
        // 'id': {
        //     type: Number,
        //     default: async function () {                // Find the maximum id value in the collection and increment it
        //         return await this.constructor.countDocuments().exec().then((count) => count + 1);
        //     }
        // },
        'created': {
            type: Date,
            default: Date.now
        },
        'sender': {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        'content': {
            type: String,
            required: true
        }
    }
);


const Chat = new Schema(
    {
        'id': {
            type: Number
        },
        'users': [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        'messages': [
            {
                type: Message
            }
        ]
    }
);

Chat.pre('save', async function (next) {
    if (!this.id) {
        try {
            const count = await this.constructor.countDocuments().exec();
            this.id = count + 1;
        } catch (error) {
            return next(error);
        }
    }
    next();
});




module.exports = {
    'Message': mongoose.model('Message', Message),
    'Chat': mongoose.model('Chat', Chat)
};