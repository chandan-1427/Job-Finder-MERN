import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String },
  companyWebsite: String,
  companyEmail: String,
  companyPhone: String,
  location: String,
  industry: String,
  teamSize: String,
  description: String,
  profilePicture: String,
  logoUrl: String,
  verified: { type: Boolean, default: false },
});

export default mongoose.model('EmployerProfile', employerProfileSchema);
