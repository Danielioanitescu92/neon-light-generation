import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
    views: {
        organic: [
            {
                itemId: {
                    type: String,
                    required: true
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
            }
        ],
        facebook: [
            {
                itemId: {
                    type: String,
                    required: true
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
            }
        ],
        googleAds: [
            {
                itemId: {
                    type: String,
                    required: true
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
            }
        ],
        total: {
                type: Number,
                required: true
            }
    },
    commCount: {
        type: Number,
        required: true
    },
    picUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
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
    },
    by: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: [
        {
            tag: {
                type: String,
                default: ""
            }
        }
    ]
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)
