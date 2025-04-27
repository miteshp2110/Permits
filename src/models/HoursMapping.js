const pool = require('../config/db');

module.exports = {
  async findByHour(hour) {
    const [rows] = await pool.execute(`SELECT * FROM hours_timing_mapping WHERE hour = ?`, [hour]);
    return rows[0];
  }
};