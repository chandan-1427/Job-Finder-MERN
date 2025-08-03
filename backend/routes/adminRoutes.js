import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
  getUnverifiedEmployers,
  getVerifiedEmployers,
  getEmployerById,
  verifyEmployer,
  unverifyEmployer,
  deleteEmployer
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/employers/unverified', protect, isAdmin, getUnverifiedEmployers);
router.get('/employers/verified', protect, isAdmin, getVerifiedEmployers);
router.get('/employers/:id', protect, isAdmin, getEmployerById);
router.put('/employers/verify/:id', protect, isAdmin, verifyEmployer);
router.put('/employers/unverify/:id', protect, isAdmin, unverifyEmployer);
router.delete('/employers/:id', protect, isAdmin, deleteEmployer);

export default router;
