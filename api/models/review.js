const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
    review: {type: String, required: true},
    rating: {type: Number, required: true},
    haveRead: {type: Boolean, required: true},
});

module.exports = mongoose.model('Review', reviewSchema);