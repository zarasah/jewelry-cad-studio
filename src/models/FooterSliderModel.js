const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FooterSliderSchema = new Schema({
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('FooterSlider', FooterSliderSchema);