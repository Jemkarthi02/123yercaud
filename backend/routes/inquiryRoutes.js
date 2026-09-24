import express from 'express';
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';

const router = express.Router();

router.get('/', getInquiries);
router.post('/', createInquiry);
router.patch('/:id/status', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
