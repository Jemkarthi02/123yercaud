import pool from '../config/db.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const [rows] = await pool.query(
      'SELECT id, username, name, role FROM admins WHERE (username = ? OR username = ?) AND password = ? LIMIT 1',
      [username.trim(), username.trim().toLowerCase(), password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid admin username or password' });
    }

    const admin = rows[0];
    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      },
      token: `admin_token_${admin.id}_${Date.now()}`
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const [rows] = await pool.query(
      'SELECT id FROM admins WHERE username = ? AND password = ? LIMIT 1',
      [username, currentPassword]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    await pool.query('UPDATE admins SET password = ? WHERE id = ?', [newPassword, rows[0].id]);
    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
