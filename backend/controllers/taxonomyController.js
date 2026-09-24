import pool from '../config/db.js';

const formatCategory = (row) => ({
  id: row.id,
  name: row.name,
  iconName: row.icon_name || 'Layers',
  color: row.color || 'bg-slate-50 text-slate-700 border-slate-200',
  description: row.description || '',
  count: Number(row.count) || 0,
  subcategories: typeof row.subcategories === 'string' ? JSON.parse(row.subcategories || '[]') : (row.subcategories || [])
});

export const getTaxonomy = async (req, res) => {
  try {
    const [catRows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    const [locRows] = await pool.query('SELECT name FROM localities ORDER BY name ASC');

    const categories = catRows.map(formatCategory);
    const localities = locRows.map((r) => r.name);

    return res.json({
      success: true,
      data: {
        categories,
        localities
      }
    });
  } catch (err) {
    console.error('Error fetching taxonomy:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch taxonomy' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const cat = req.body;
    const id = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const [existing] = await pool.query('SELECT id FROM categories WHERE LOWER(name) = LOWER(?)', [cat.name]);
    if (existing.length > 0) {
      // Update
      await pool.query(
        `UPDATE categories SET 
          icon_name = ?, color = ?, description = ?, count = ?, subcategories = ? 
        WHERE LOWER(name) = LOWER(?)`,
        [
          cat.iconName || 'Layers',
          cat.color || 'bg-slate-50 text-slate-700 border-slate-200',
          cat.description || '',
          cat.count || 0,
          JSON.stringify(cat.subcategories || []),
          cat.name
        ]
      );
    } else {
      // Insert
      await pool.query(
        `INSERT INTO categories (id, name, icon_name, color, description, count, subcategories)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          cat.name,
          cat.iconName || 'Layers',
          cat.color || 'bg-slate-50 text-slate-700 border-slate-200',
          cat.description || '',
          cat.count || 0,
          JSON.stringify(cat.subcategories || [])
        ]
      );
    }

    const [rows] = await pool.query('SELECT * FROM categories WHERE LOWER(name) = LOWER(?)', [cat.name]);
    return res.status(201).json({ success: true, message: 'Category saved', data: formatCategory(rows[0]) });
  } catch (err) {
    console.error('Error saving category:', err);
    return res.status(500).json({ success: false, message: 'Failed to save category' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { name } = req.params;
    await pool.query('DELETE FROM categories WHERE LOWER(name) = LOWER(?) OR id = ?', [name, name]);
    return res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error('Error deleting category:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};

export const addSubcategory = async (req, res) => {
  try {
    const { name } = req.params;
    const { subcategory } = req.body;
    if (!subcategory) {
      return res.status(400).json({ success: false, message: 'Subcategory name required' });
    }

    const [rows] = await pool.query('SELECT * FROM categories WHERE LOWER(name) = LOWER(?) OR id = ? LIMIT 1', [name, name]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const cat = formatCategory(rows[0]);
    if (!cat.subcategories.includes(subcategory)) {
      cat.subcategories.push(subcategory);
      await pool.query('UPDATE categories SET subcategories = ? WHERE id = ?', [
        JSON.stringify(cat.subcategories),
        cat.id
      ]);
    }

    return res.json({ success: true, message: 'Subcategory added', data: cat });
  } catch (err) {
    console.error('Error adding subcategory:', err);
    return res.status(500).json({ success: false, message: 'Failed to add subcategory' });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { name, subName } = req.params;
    const [rows] = await pool.query('SELECT * FROM categories WHERE LOWER(name) = LOWER(?) OR id = ? LIMIT 1', [name, name]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const cat = formatCategory(rows[0]);
    cat.subcategories = cat.subcategories.filter((s) => s.toLowerCase() !== subName.toLowerCase());
    await pool.query('UPDATE categories SET subcategories = ? WHERE id = ?', [
      JSON.stringify(cat.subcategories),
      cat.id
    ]);

    return res.json({ success: true, message: 'Subcategory removed', data: cat });
  } catch (err) {
    console.error('Error removing subcategory:', err);
    return res.status(500).json({ success: false, message: 'Failed to remove subcategory' });
  }
};

export const addLocality = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Locality name required' });

    await pool.query('INSERT IGNORE INTO localities (name) VALUES (?)', [name.trim()]);
    return res.json({ success: true, message: 'Locality added', locality: name.trim() });
  } catch (err) {
    console.error('Error adding locality:', err);
    return res.status(500).json({ success: false, message: 'Failed to add locality' });
  }
};

export const deleteLocality = async (req, res) => {
  try {
    const { name } = req.params;
    await pool.query('DELETE FROM localities WHERE LOWER(name) = LOWER(?)', [name.trim()]);
    return res.json({ success: true, message: 'Locality removed' });
  } catch (err) {
    console.error('Error deleting locality:', err);
    return res.status(500).json({ success: false, message: 'Failed to remove locality' });
  }
};
