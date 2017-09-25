const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: String,
    text: String
});

module.exports = mongoose.model('Comment', CommentSchema);