import mongoose from 'mongoose'

const AboutSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: "1"
    },
    text: {
        blocks: [
            {
                type: {
                    type: String,
                    required: true
                },
                data: {
                    alignment: {
                        type: String
                    },
                    caption: {
                        type: String
                    },
                    text: {
                        type: String
                    },
                    level: {
                        type: Number
                    },
                    link: {
                        type: String
                    },
                    meta: {
                        type: Object
                    },
                    message: {
                        type: String
                    },
                    title: {
                        type: String
                    },
                    style: {
                        type: String
                    },
                    items: [
                        {
                            type: String
                        }
                    ]
                }
            },
        ]
    }
});

// export default mongoose.models.About || mongoose.model('Aboutus', AboutSchema);

global.AboutSchema = global.AboutSchema || mongoose.model('Aboutus', AboutSchema);
module.exports = global.AboutSchema;