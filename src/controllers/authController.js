const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');

dotenv.config();

async function login(req, res) {
  const { email, password } = req.body;
  let user = await Admin.findByEmail(email);
  let role = 'admin';
  if (!user) {
    user = await Teacher.findByEmail(email);
    role = 'teacher';
  }
  if (!user) {
    user = await User.findByEmail(email);
    role = 'user';
  }
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.json({ token, email: user.email, role });
}

module.exports = { login };