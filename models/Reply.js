import mongoose from 'mongoose'

const ReplySchema = new mongoose.Schema({
    likes: [
        {
            replyId: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    forWich: {
        type: String,
        required: true
    },
    parentComm: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Reply || mongoose.model('Reply', ReplySchema);