const mongoose = require('mongoose');

const CommentModel = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    originalBlog: {
        type: String,
        required: true
      }
  }, {timestamps: true});
  
  const Comment = mongoose.model('Comment', CommentModel);


module.exports = Comment;