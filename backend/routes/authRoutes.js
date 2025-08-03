import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protect, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register); // Provide role in body
router.post('/login', login);
router.post('/logout', logout);

// Example secured routes:
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

router.get('/admin-data', protect, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin 👑' });
});

export default router;
