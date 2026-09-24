import pool from '../config/db.js';

const formatInquiry = (row) => ({
  id: row.id,
  businessId: row.business_id || undefined,
  businessName: row.business_name || undefined,
  category: row.category || undefined,
  userName: row.user_name,
  userPhone: row.user_phone,
  userEmail: row.user_email || undefined,
  requirement: row.requirement || '',
  locality: row.locality || 'Yercaud',
  date: row.date || 'Today',
  time: row.time || '10:00 AM',
  status: row.status || 'new',
  source: row.source || 'detail_enquiry',
  notes: row.notes || undefined
});

export const getInquiries = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC, id DESC');
    return res.json({ success: true, data: rows.map(formatInquiry) });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
};

export const createInquiry = async (req, res) => {
  try {
    const inq = req.body;
    const id = inq.id || `inq-${Date.now()}`;

    await pool.query(
      `INSERT INTO inquiries (
        id, business_id, business_name, category, user_name, user_phone, 
        user_email, requirement, locality, date, time, status, source, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        inq.businessId || null,
        inq.businessName || null,
        inq.category || null,
        inq.userName,
        inq.userPhone,
        inq.userEmail || null,
        inq.requirement || '',
        inq.locality || 'Yercaud',
        inq.date || 'Today',
        inq.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        inq.status || 'new',
        inq.source || 'detail_enquiry',
        inq.notes || null
      ]
    );

    const [created] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: formatInquiry(created[0]) });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (notes !== undefined) {
      await pool.query('UPDATE inquiries SET status = ?, notes = ? WHERE id = ?', [status, notes, id]);
    } else {
      await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    }

    const [updated] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({ success: true, message: 'Inquiry status updated', data: formatInquiry(updated[0]) });
  } catch (err) {
    console.error('Error updating inquiry status:', err);
    return res.status(500).json({ success: false, message: 'Failed to update inquiry status' });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
};
