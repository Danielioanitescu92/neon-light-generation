import mongoose from 'mongoose'

const OtherSchema = new mongoose.Schema({
    way: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    screenSize: {
        type: Number
    },
    unique: {
        type: String
    }
})

// export default mongoose.models.Other || mongoose.model('other', OtherSchema)

global.OtherSchema = global.OtherSchema || mongoose.model('other', OtherSchema);
module.exports = global.OtherSchema;
