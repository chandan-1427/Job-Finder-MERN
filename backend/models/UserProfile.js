import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  phone: String,
  dob: Date,
  location: String,
  education: [{
    degree: String,
    institution: String,
    year: Number,
    field: String,
  }],
  experience: [{
    jobTitle: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  skills: [String],
  languages: [String],
  resumeUrl: String,
  profilePicture: String,
  jobTypePreference: [String],
  expectedSalary: Number,
  linkedin: String,
  github: String,
  website: String,
});

export default mongoose.model('UserProfile', userProfileSchema);
