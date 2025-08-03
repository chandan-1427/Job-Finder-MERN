// routes/profileRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import {
  getUserProfile,
  getEmployerProfile,
  updateUserProfile,
  updateEmployerProfile,
  uploadUserProfilePicture,
  uploadEmployerLogo
} from '../controllers/profileController.js';

const router = express.Router();

// GET routes
router.get('/user', protect, getUserProfile);
router.get('/employer', protect, getEmployerProfile);

// PUT routes
router.put('/user/update', protect, updateUserProfile);
router.put('/employer/update', protect, updateEmployerProfile);

router.post(
  '/user/upload-profile-picture',
  protect,
  upload.single('profilePicture'),
  uploadUserProfilePicture
);
router.post(
  '/employer/upload-logo',
  protect,
  upload.single('logo'),
  uploadEmployerLogo
);

export default router;
