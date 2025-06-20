const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required']
    },
    title: {
      type: String,
      required: [true, 'Song title is required'],
      trim: true,
      maxlength: [100, 'Song title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: ['draft', 'in-review', 'final'],
      default: 'draft'
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true
  }
);

// Virtual field to get the versions of this song
songSchema.virtual('versions', {
  ref: 'Version',
  localField: '_id',
  foreignField: 'songId'
});

// Include virtuals when converting to JSON
songSchema.set('toJSON', { virtuals: true });
songSchema.set('toObject', { virtuals: true });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;