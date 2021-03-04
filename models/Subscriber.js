import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    ToDeletePasswordToken: {
        type: String
    },
    ToDeletePasswordExpires: {
        type: Date
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);