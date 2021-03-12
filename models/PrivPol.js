import mongoose from 'mongoose'

const PrivPolSchema = new mongoose.Schema({
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

// export default mongoose.models.PrivPol || mongoose.model('Privpol', PrivPolSchema);

global.PrivPolSchema = global.PrivPolSchema || mongoose.model('Privpol', PrivPolSchema);
module.exports = global.PrivPolSchema;