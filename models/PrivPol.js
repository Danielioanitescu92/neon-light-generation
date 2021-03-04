import mongoose from 'mongoose'

const PrivPolSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: "1"
    },
    text: {
        type: String,
        required: true,
        default: "Lorem Ipsum"
    }
});

// export default mongoose.models.PrivPol || mongoose.model('Privpol', PrivPolSchema);

global.PrivPolSchema = global.PrivPolSchema || mongoose.model('Privpol', PrivPolSchema);
module.exports = global.PrivPolSchema;