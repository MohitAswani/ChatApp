const { default: mongoose } = require('mongoose');
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String
    },
    convos: [{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DirectMessage',
            required: true
        }
    }],
});

module.exports = mongoose.models.User || model('User', UserSchema);