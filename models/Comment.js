import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    likes: [
        {
            commentId: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);