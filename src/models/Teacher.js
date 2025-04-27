const pool = require('../config/db');

module.exports = {
  async create({ name, empId, email, password }) {
    const [result] = await pool.execute(
      `INSERT INTO teacher (name, empId, email, password) VALUES (?, ?, ?, ?)`,
      [name, empId, email, password]
    );
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await pool.execute(`SELECT * FROM teacher WHERE email = ?`, [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.execute(`SELECT id, name, empId, email FROM teacher WHERE id = ?`, [id]);
    return rows[0];
  }
};