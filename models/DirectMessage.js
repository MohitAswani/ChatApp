const { default: mongoose } = require('mongoose');
const { model, Schema } = require('mongoose');

const DirectMessageSchema = new Schema({
    sentBy: {
        username: {
            type: String,
            required: true,
            unique: true
        },
        profilePic: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    sendTo: {
        username: {
            type: String,
            required: true,
            unique: true
        },
        profilePic: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    sentAt: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.DirectMessage || model('DirectMessage', DirectMessageSchema);