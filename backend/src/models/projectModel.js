const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required']
    },
    collaborators: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        role: {
          type: String,
          enum: ['admin', 'editor', 'viewer'],
          default: 'viewer'
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'completed'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Virtual field to get the songs associated with this project
projectSchema.virtual('songs', {
  ref: 'Song',
  localField: '_id',
  foreignField: 'projectId'
});

// Include virtuals when converting to JSON
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;