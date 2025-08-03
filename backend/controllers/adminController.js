import EmployerProfile from '../models/EmployerProfile.js';
import Notification from '../models/Notification.js';

export const getUnverifiedEmployers = async (req, res) => {
  try {
    const unverified = await EmployerProfile.find({ verified: false }).populate('user', 'email');
    res.json(unverified);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employers' });
  }
};

export const getVerifiedEmployers = async (req, res) => {
  try {
    const verified = await EmployerProfile.find({ verified: true }).populate('user', 'email');
    res.json(verified);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch verified employers' });
  }
};

export const verifyEmployer = async (req, res) => {
  try {
    const employer = await EmployerProfile.findById(req.params.id);
    if (!employer) return res.status(404).json({ message: 'Employer not found' });

    employer.verified = true;
    await employer.save();
    await Notification.create({
      recipient: employer.user,
      type: 'employer',
      message: 'Your employer profile has been verified!',
      link: '/employer/profile',
    });
    res.json({ message: 'Employer verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
};

export const unverifyEmployer = async (req, res) => {
  try {
    const employer = await EmployerProfile.findById(req.params.id);
    if (!employer) return res.status(404).json({ message: 'Employer not found' });

    employer.verified = false;
    await employer.save();
    res.json({ message: 'Employer unverified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unverify employer' });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const employer = await EmployerProfile.findById(req.params.id).populate('user', 'email name');
    if (!employer) return res.status(404).json({ message: 'Employer not found' });

    res.json(employer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employer' });
  }
};

export const deleteEmployer = async (req, res) => {
  try {
    const employer = await EmployerProfile.findById(req.params.id);
    if (!employer) return res.status(404).json({ message: 'Employer not found' });

    // Optional: delete jobs posted by this employer
    // await Job.deleteMany({ employer: employer._id });

    await employer.deleteOne();
    res.json({ message: 'Employer profile deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete employer' });
  }
};
