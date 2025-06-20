const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    type: {
      type: String,
      required: [true, 'Notification type is required'],
      enum: ['comment', 'version', 'invite', 'deadline', 'system']
    },
    content: {
      type: String,
      required: [true, 'Notification content is required']
    },
    relatedTo: {
      type: {
        type: String,
        required: [true, 'Related type is required'],
        enum: ['project', 'song', 'version', 'comment']
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Related ID is required']
      }
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;