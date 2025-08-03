// routes/notificationRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getNotifications,
  markNotificationAsRead,
  clearNotifications,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

// GET all notifications for the logged-in user
router.get('/', protect, getNotifications);

// PUT to mark a notification as read
router.put('/:notificationId/read', protect, markNotificationAsRead);
router.delete('/clear', protect, clearNotifications);
router.delete('/:id', protect, deleteNotification);

export default router;
