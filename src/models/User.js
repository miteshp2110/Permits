const pool = require('../config/db');

module.exports = {
  async create({ name, roll, email, password }) {
    const [result] = await pool.execute(
      `INSERT INTO users (name, roll, email, password) VALUES (?, ?, ?, ?)`,
      [name, roll, email, password]
    );
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.execute(`SELECT id, name, roll, email, createdAt FROM users WHERE id = ?`, [id]);
    return rows[0];
  }
};