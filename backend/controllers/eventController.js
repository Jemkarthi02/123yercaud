import pool from '../config/db.js';

const formatEvent = (row) => ({
  id: row.id,
  title: row.title,
  date: row.date || '',
  day: row.day || undefined,
  month: row.month || undefined,
  time: row.time || '',
  location: row.location || '',
  category: row.category || '',
  description: row.description || '',
  fullDetails: row.full_details || undefined,
  organizer: row.organizer || '',
  organizerPhone: row.organizer_phone || undefined,
  organizerEmail: row.organizer_email || undefined,
  imageUrl: row.image_url || '',
  entryFee: row.entry_fee || 'Free Entry',
  isFeatured: Boolean(row.is_featured),
  status: row.status || 'upcoming',
  venueMapUrl: row.venue_map_url || undefined
});

export const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY is_featured DESC, date ASC');
    return res.json({ success: true, data: rows.map(formatEvent) });
  } catch (err) {
    console.error('Error fetching events:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch events' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const ev = req.body;
    const id = ev.id || `ev-${Date.now()}`;

    await pool.query(
      `INSERT INTO events (
        id, title, date, day, month, time, location, category, 
        description, full_details, organizer, organizer_phone, 
        organizer_email, image_url, entry_fee, is_featured, status, venue_map_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        ev.title,
        ev.date || '',
        ev.day || '',
        ev.month || '',
        ev.time || '',
        ev.location || '',
        ev.category || '',
        ev.description || '',
        ev.fullDetails || null,
        ev.organizer || '',
        ev.organizerPhone || null,
        ev.organizerEmail || null,
        ev.imageUrl || '',
        ev.entryFee || 'Free Entry',
        ev.isFeatured ? 1 : 0,
        ev.status || 'upcoming',
        ev.venueMapUrl || null
      ]
    );

    const [created] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Event created successfully', data: formatEvent(created[0]) });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ success: false, message: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const ev = req.body;

    await pool.query(
      `UPDATE events SET 
        title = ?, date = ?, day = ?, month = ?, time = ?, location = ?, category = ?, 
        description = ?, full_details = ?, organizer = ?, organizer_phone = ?, 
        organizer_email = ?, image_url = ?, entry_fee = ?, is_featured = ?, status = ?, venue_map_url = ?
      WHERE id = ?`,
      [
        ev.title,
        ev.date || '',
        ev.day || '',
        ev.month || '',
        ev.time || '',
        ev.location || '',
        ev.category || '',
        ev.description || '',
        ev.fullDetails || null,
        ev.organizer || '',
        ev.organizerPhone || null,
        ev.organizerEmail || null,
        ev.imageUrl || '',
        ev.entryFee || 'Free Entry',
        ev.isFeatured ? 1 : 0,
        ev.status || 'upcoming',
        ev.venueMapUrl || null,
        id
      ]
    );

    const [updated] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.json({ success: true, message: 'Event updated successfully', data: formatEvent(updated[0]) });
  } catch (err) {
    console.error('Error updating event:', err);
    return res.status(500).json({ success: false, message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM events WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
};
