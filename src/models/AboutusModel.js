const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutUsSchema = new Schema({
    headerImage: {
        type: String,
    },
    text1: {
        type: String,
    },
    text2: {
        type: String,
    },
    sliderImages: [{
        filename: String
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);