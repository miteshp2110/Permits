const pool = require('../config/db');

module.exports = {
  async create({ user_id, title, description, hours_from, hours_to }) {
    const [result] = await pool.execute(
      `INSERT INTO permission (user_id, title, description, hours_from, hours_to) VALUES (?, ?, ?, ?, ?)`,
      [user_id, title, description, hours_from, hours_to]
    );
    return result.insertId;
  },
  async findByUser(user_id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.roll FROM permission p JOIN users u ON p.user_id = u.id WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.roll, a.name AS authorized_by_name, t.name AS approved_by_name,
              hf.start_time AS from_time, ht.end_time AS to_time
       FROM permission p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN admin a ON p.authorized_by = a.id
       LEFT JOIN teacher t ON p.approved_by = t.id
       JOIN hours_timing_mapping hf ON p.hours_from = hf.hour
       JOIN hours_timing_mapping ht ON p.hours_to = ht.hour
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.execute(
      `SELECT p.*, u.roll, a.name AS authorized_by_name, t.name AS approved_by_name
       FROM permission p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN admin a ON p.authorized_by = a.id
       LEFT JOIN teacher t ON p.approved_by = t.id`
    );
    return rows;
  },
  async authorize(id, admin_id) {
    await pool.execute(
      `UPDATE permission SET authorized = true, authorized_by = ? WHERE id = ?`,
      [admin_id, id]
    );
  },
  async approve(id, teacher_id) {
    await pool.execute(
      `UPDATE permission SET approved_by = ? WHERE id = ?`,
      [teacher_id, id]
    );
  },
  async findByTeacher(teacher_id) {
    const [rows] = await pool.execute(
      `SELECT p.* FROM permission p WHERE approved_by = ?`,
      [teacher_id]
    );
    return rows;
  }
};