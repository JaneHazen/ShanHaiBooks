const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    authorFirstName: String,
    authorLastName: String,
    country: String
});

module.exports = mongoose.model('Book', bookSchema);