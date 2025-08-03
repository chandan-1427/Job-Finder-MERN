import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import EmployerProfile from '../models/EmployerProfile.js';
import generateToken from '../utils/generateToken.js';

// Register Controller
export const register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // Create new user
    const user = await User.create({ name, email, password, role });

    // Create default profile based on role
    if (role === 'user') {
      await UserProfile.create({
        user: user._id,
        phone: '',
        location: '',
        skills: [],
        resumeUrl: '',
        education: [],
        experience: [],
        languages: [],
        jobTypePreference: [],
      });
    } else if (role === 'employer') {
      await EmployerProfile.create({
        user: user._id,
        companyName: '',
        companyEmail: email, // use email as default
        companyPhone: '',
        location: '',
        industry: '',
        teamSize: '',
        description: '',
        logoUrl: '',
        verified: false, // explicitly mark as unverified
      });
    }

    // Respond with token and user info
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error('[Register Error]', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    // Optionally you can blacklist the token here if needed

    // Just return success to client
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
};
