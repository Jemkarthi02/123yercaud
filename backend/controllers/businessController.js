import pool from '../config/db.js';

// Helper to format DB row to frontend Business object
const formatBusiness = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  subcategory: row.subcategory || '',
  rating: Number(row.rating) || 4.5,
  reviewCount: Number(row.review_count) || 0,
  address: row.address || '',
  locality: row.locality || '',
  pincode: row.pincode || '636601',
  phone: row.phone || '',
  alternatePhone: row.alternate_phone || undefined,
  whatsapp: row.whatsapp || undefined,
  email: row.email || undefined,
  website: row.website || undefined,
  mapUrl: row.map_url || undefined,
  openingHours: row.opening_hours || '9:00 AM - 8:00 PM',
  isVerified: Boolean(row.is_verified),
  isFeatured: Boolean(row.is_featured),
  establishedYear: row.established_year ? Number(row.established_year) : undefined,
  contactPerson: row.contact_person || undefined,
  slotBadge: row.slot_badge || undefined,
  tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : (row.tags || []),
  description: row.description || '',
  services: typeof row.services === 'string' ? JSON.parse(row.services || '[]') : (row.services || []),
  imageUrl: row.image_url || '',
  gallery: typeof row.gallery === 'string' ? JSON.parse(row.gallery || '[]') : (row.gallery || []),
  reviews: typeof row.reviews === 'string' ? JSON.parse(row.reviews || '[]') : (row.reviews || [])
});

export const getBusinesses = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM businesses ORDER BY is_featured DESC, rating DESC, name ASC');
    const businesses = rows.map(formatBusiness);
    return res.json({ success: true, data: businesses });
  } catch (err) {
    console.error('Error fetching businesses:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch businesses' });
  }
};

export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM businesses WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }
    return res.json({ success: true, data: formatBusiness(rows[0]) });
  } catch (err) {
    console.error('Error fetching business by id:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch business' });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const b = req.body;
    const id = b.id || `biz-${Date.now()}`;

    await pool.query(
      `INSERT INTO businesses (
        id, name, category, subcategory, rating, review_count, address, locality, 
        pincode, phone, alternate_phone, whatsapp, email, website, map_url, 
        opening_hours, is_verified, is_featured, established_year, contact_person, 
        slot_badge, tags, description, services, image_url, gallery, reviews
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        b.name,
        b.category,
        b.subcategory || '',
        b.rating || 4.5,
        b.reviewCount || 0,
        b.address || '',
        b.locality || 'Yercaud',
        b.pincode || '636601',
        b.phone || '',
        b.alternatePhone || null,
        b.whatsapp || null,
        b.email || null,
        b.website || null,
        b.mapUrl || null,
        b.openingHours || '9:00 AM - 8:00 PM',
        b.isVerified ? 1 : 0,
        b.isFeatured ? 1 : 0,
        b.establishedYear || 2015,
        b.contactPerson || null,
        b.slotBadge || null,
        JSON.stringify(b.tags || []),
        b.description || '',
        JSON.stringify(b.services || []),
        b.imageUrl || '',
        JSON.stringify(b.gallery || []),
        JSON.stringify(b.reviews || [])
      ]
    );

    const [created] = await pool.query('SELECT * FROM businesses WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Business created successfully', data: formatBusiness(created[0]) });
  } catch (err) {
    console.error('Error creating business:', err);
    return res.status(500).json({ success: false, message: 'Failed to create business', error: err.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const b = req.body;

    const [existing] = await pool.query('SELECT id FROM businesses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    await pool.query(
      `UPDATE businesses SET 
        name = ?, category = ?, subcategory = ?, rating = ?, review_count = ?, address = ?, locality = ?, 
        pincode = ?, phone = ?, alternate_phone = ?, whatsapp = ?, email = ?, website = ?, map_url = ?, 
        opening_hours = ?, is_verified = ?, is_featured = ?, established_year = ?, contact_person = ?, 
        slot_badge = ?, tags = ?, description = ?, services = ?, image_url = ?, gallery = ?, reviews = ?
      WHERE id = ?`,
      [
        b.name,
        b.category,
        b.subcategory || '',
        b.rating || 4.5,
        b.reviewCount || 0,
        b.address || '',
        b.locality || 'Yercaud',
        b.pincode || '636601',
        b.phone || '',
        b.alternatePhone || null,
        b.whatsapp || null,
        b.email || null,
        b.website || null,
        b.mapUrl || null,
        b.openingHours || '9:00 AM - 8:00 PM',
        b.isVerified ? 1 : 0,
        b.isFeatured ? 1 : 0,
        b.establishedYear || 2015,
        b.contactPerson || null,
        b.slotBadge || null,
        JSON.stringify(b.tags || []),
        b.description || '',
        JSON.stringify(b.services || []),
        b.imageUrl || '',
        JSON.stringify(b.gallery || []),
        JSON.stringify(b.reviews || []),
        id
      ]
    );

    const [updated] = await pool.query('SELECT * FROM businesses WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Business updated successfully', data: formatBusiness(updated[0]) });
  } catch (err) {
    console.error('Error updating business:', err);
    return res.status(500).json({ success: false, message: 'Failed to update business', error: err.message });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM businesses WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Business deleted successfully' });
  } catch (err) {
    console.error('Error deleting business:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete business' });
  }
};
