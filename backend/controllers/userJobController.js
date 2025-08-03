import Job from '../models/Job.js';
import User from '../models/User.js';
import EmployerProfile from '../models/EmployerProfile.js';
import Notification from '../models/Notification.js';

export const applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const { resumeUrl, coverLetter } = req.body;
  const userId = req.user._id;

  try {
    // 1. Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 2. Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 3. Restrict to role === 'user' only
    if (user.role !== 'user') {
      return res.status(403).json({
        message: 'Only job seekers can apply. Please sign in with a job seeker account.',
      });
    }

    // 4. Check if already applied
    const alreadyApplied = job.applications.some(
      (app) => app.user.toString() === userId.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied for this job' });
    }

    // 5. Save application
    job.applications.push({
      user: userId,
      resumeUrl,
      coverLetter,
    });

    await job.save();

    // 6. Notify the employer
    const employerProfile = await EmployerProfile.findById(job.employer);

if (employerProfile && employerProfile.user) {
  await Notification.create({
    recipient: employerProfile.user,
    type: 'employer',
    message: `${user.name} has applied for ${job.title}`,
    link: `/employer/job/${job._id}/applications`,
  });
}

    return res
      .status(200)
      .json({ success: true, message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getJobsAppliedByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all jobs where this user is in the applications array
    const jobs = await Job.find({ 'applications.user': userId })
      .populate({
        path: 'employer',
        select: 'companyName logoUrl location',
      })
      .sort({ createdAt: -1 });

    // Map only relevant application data per job
    const appliedJobs = jobs.map(job => {
      const application = job.applications.find(
        app => app.user.toString() === userId.toString()
      );

      return {
        jobId: job._id,
        title: job.title,
        company: job.employer?.companyName || 'Unknown',
        logoUrl: job.employer?.logoUrl || '',
        location: job.location,
        jobType: job.jobType,
        appliedAt: application.appliedAt,
        resumeUrl: application.resumeUrl,
        coverLetter: application.coverLetter,
        status: application.status,
      };
    });

    res.status(200).json({ success: true, appliedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

