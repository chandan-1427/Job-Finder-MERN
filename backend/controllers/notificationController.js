// controllers/notificationController.js
import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearNotifications = async (req, res) => {
  const userId = req.user._id;

  await Notification.deleteMany({ recipient: userId }); // ✅ fixed

  res.json({ message: "Notifications cleared." });
};

export const deleteNotification = async (req, res) => {
  const userId = req.user._id;
  const notificationId = req.params.id;

  const deleted = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId, // ✅ fixed
  });

  if (!deleted) {
    return res.status(404).json({ message: "Notification not found or unauthorized" });
  }

  res.json({ message: "Notification deleted" });
};

