const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../common/enums/category.enum');

const PortfolioSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: categories
    },
    filename: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);