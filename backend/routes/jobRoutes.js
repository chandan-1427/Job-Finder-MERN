// routes/jobRoutes.js

import express from 'express';
import { postJob,
  getJobsPostedByEmployer,
  getAllAvailableJobs,
  editJobPost,
  deleteJobPost,
  viewApplicationsForJob,
  updateApplicationStatus
} from '../controllers/employerJobController.js';
import { applyToJob, getJobsAppliedByUser } from '../controllers/userJobController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, postJob);              // POST /api/jobs
router.post('/:jobId/apply', protect, applyToJob); // PUT /api/jobs/:jobId/apply
router.get('/employer/my-jobs', protect, getJobsPostedByEmployer);
router.get('/', getAllAvailableJobs);
router.get('/user/applied-jobs', protect, getJobsAppliedByUser);
router.put('/:jobId', protect, editJobPost);
router.delete('/:jobId', protect, deleteJobPost);
router.get('/:jobId/applications', protect, viewApplicationsForJob);
router.put('/applications/:jobId/:userId/status', protect, updateApplicationStatus);

export default router;
