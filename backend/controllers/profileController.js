import UserProfile from '../models/UserProfile.js';
import EmployerProfile from '../models/EmployerProfile.js';

// Get logged-in user's profile
export const getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: "User profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in employer's profile
export const getEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: "Employer profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'User profile not found' });

    Object.assign(profile, req.body); // update all sent fields
    await profile.save();

    res.json({ success: true, message: 'User profile updated', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Employer profile not found' });

    Object.assign(profile, req.body); // update all sent fields
    await profile.save();

    res.json({ success: true, message: 'Employer profile updated', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadUserProfilePicture = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    userProfile.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    await userProfile.save();

    res.json({
      message: 'Profile picture updated successfully',
      profilePicture: userProfile.profilePicture,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
};

export const uploadEmployerLogo = async (req, res) => {
  try {
    const employerProfile = await EmployerProfile.findOne({ user: req.user._id });

    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    employerProfile.logoUrl = `/uploads/employer-logos/${req.file.filename}`;
    await employerProfile.save();

    res.json({
      message: 'Employer logo uploaded successfully',
      logoUrl: employerProfile.logoUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload employer logo' });
  }
};
