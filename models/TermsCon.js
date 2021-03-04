import mongoose from 'mongoose'

const TermsConSchema = new mongoose.Schema({
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

// export default mongoose.models.TermsCon || mongoose.model('Termscon', TermsConSchema);

global.TermsConSchema = global.TermsConSchema || mongoose.model('Termscon', TermsConSchema);
module.exports = global.TermsConSchema;