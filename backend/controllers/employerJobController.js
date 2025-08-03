import Job from '../models/Job.js';
import EmployerProfile from '../models/EmployerProfile.js';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import Notification from '../models/Notification.js';

export const postJob = async (req, res) => {
  const {
    title,
    description,
    location,
    jobType,
    salaryRange,
    skillsRequired,
    openings,
    deadline
  } = req.body;

  const userId = req.user._id;

  try {
    // Check if employer profile exists
    const employerProfile = await EmployerProfile.findOne({ user: userId });

    if (!employerProfile) {
      return res.status(403).json({ message: 'Employer profile not found' });
    }

    const newJob = new Job({
      employer: employerProfile._id,
      title,
      description,
      location,
      jobType,
      salaryRange,
      skillsRequired,
      openings,
      deadline
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job: savedJob
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobsPostedByEmployer = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get employer profile linked to logged-in user
    const employerProfile = await EmployerProfile.findOne({ user: userId });

    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    // Find all jobs posted by this employer
    const jobs = await Job.find({ employer: employerProfile._id }).populate("applications.user").sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllAvailableJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate({
        path: 'employer',
        model: 'EmployerProfile',
        select: 'companyName location logoUrl verified' // optional fields for display
      })
      .sort({ createdAt: -1 }); // newest jobs first

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const editJobPost = async (req, res) => {
  const userId = req.user._id;
  const { jobId } = req.params;
  const updates = req.body;

  try {
    const employerProfile = await EmployerProfile.findOne({ user: userId });
    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== employerProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this job' });
    }

    Object.assign(job, updates);
    const updatedJob = await job.save();

    res.status(200).json({ success: true, message: 'Job updated successfully', job: updatedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJobPost = async (req, res) => {
  const userId = req.user._id;
  const { jobId } = req.params;

  try {
    const employerProfile = await EmployerProfile.findOne({ user: userId });
    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== employerProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const viewApplicationsForJob = async (req, res) => {
  const userId = req.user._id;
  const { jobId } = req.params;

  try {
    const employerProfile = await EmployerProfile.findOne({ user: userId });
    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    const job = await Job.findById(jobId).populate('applications.user');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== employerProfile._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view applicants for this job' });
    }

    const applications = await Promise.all(
      job.applications.map(async (app) => {
        const userProfile = await UserProfile.findOne({ user: app.user._id });
        return {
          userId: app.user._id,
          name: app.user.name,
          email: app.user.email,
          resumeUrl: app.resumeUrl,
          coverLetter: app.coverLetter,
          status: app.status,
          appliedAt: app.appliedAt,
          profile: userProfile || {},
        };
      })
    );

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { jobId, userId } = req.params;
  const { status } = req.body;

  if (!["Pending", "Reviewed", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = job.applications.find(
      (app) => app.user.toString() === userId
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Update the status
    application.status = status;
    await job.save();

    // ✅ Create a notification
    await Notification.create({
      recipient: userId,
      type: 'user',
      message: `Your application for "${job.title}" was marked as ${status}.`,
      link: `/jobs/${jobId}`, // frontend route to job or application
    });

    res.status(200).json({ success: true, message: "Application status updated", status });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
