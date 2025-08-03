import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // could be user or employer's user ID
      required: true,
    },
    type: {
      type: String,
      enum: ['user', 'employer'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String, // frontend route to navigate to
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
