const pool = require('../config/db');

module.exports = {
  async create({ name, position, empId, email, password }) {
    const [result] = await pool.execute(
      `INSERT INTO admin (name, position, empId, email, password) VALUES (?, ?, ?, ?, ?)`,
      [name, position, empId, email, password]
    );
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await pool.execute(`SELECT * FROM admin WHERE email = ?`, [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.execute(`SELECT id, name, position, empId, email FROM admin WHERE id = ?`, [id]);
    return rows[0];
  }
};