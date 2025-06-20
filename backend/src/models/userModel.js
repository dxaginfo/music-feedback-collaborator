const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    profilePicture: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    settings: {
      notificationPreferences: {
        email: {
          newComment: { type: Boolean, default: true },
          newVersion: { type: Boolean, default: true },
          projectInvite: { type: Boolean, default: true }
        },
        inApp: {
          newComment: { type: Boolean, default: true },
          newVersion: { type: Boolean, default: true },
          projectInvite: { type: Boolean, default: true }
        }
      },
      theme: { type: String, default: 'light' }
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to hide private fields when converting to JSON
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;