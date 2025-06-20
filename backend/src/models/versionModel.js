const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema(
  {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: [true, 'Song ID is required']
    },
    versionNumber: {
      type: Number,
      required: [true, 'Version number is required']
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required']
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required']
    },
    duration: {
      type: Number,
      required: [true, 'Audio duration is required']
    },
    format: {
      type: String,
      required: [true, 'Audio format is required']
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader ID is required']
    },
    notes: {
      type: String,
      trim: true
    },
    waveformData: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Virtual field to get the comments for this version
versionSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'versionId'
});

// Include virtuals when converting to JSON
versionSchema.set('toJSON', { virtuals: true });
versionSchema.set('toObject', { virtuals: true });

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;