const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    bannerText: {
        type: String,
        required: true,
    },
    bannerImage: {
        type: String,
        required: true,
    },
    imagesWithText: [
        {
            image: { type: String, required: true },
            text: { type: String, required: true }
        }
    ],
    text2: {
        type: String,
        required: true,
    },
    text3: {
        type: String,
        required: true,
    },
    text4: {
        type: String,
        required: true,
    },
    text5: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);