import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // from your user auth schema
      required: true,
    },
    resumeUrl: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployerProfile",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Remote"],
      required: true,
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },
    skillsRequired: [String],
    openings: {
      type: Number,
      default: 1,
    },
    deadline: {
      type: Date,
    },
    applications: [applicationSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
