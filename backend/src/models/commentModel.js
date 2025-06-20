const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Reply content is required'],
      trim: true,
      maxlength: [1000, 'Reply cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const commentSchema = new mongoose.Schema(
  {
    versionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Version',
      required: [true, 'Version ID is required']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    timestamp: {
      type: Number,
      required: [true, 'Timestamp is required'],
      min: [0, 'Timestamp cannot be negative']
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    resolved: {
      type: Boolean,
      default: false
    },
    replies: [replySchema]
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;