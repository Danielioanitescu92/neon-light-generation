import mongoose from 'mongoose'

const AboutSchema = new mongoose.Schema({
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

// export default mongoose.models.About || mongoose.model('Aboutus', AboutSchema);

global.AboutSchema = global.AboutSchema || mongoose.model('Aboutus', AboutSchema);
module.exports = global.AboutSchema;