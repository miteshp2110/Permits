const bcrypt = require('bcrypt');
const User = require('../models/User');
const Permission = require('../models/Permission');

async function signup(req, res) {
  const { name, roll, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = await User.create({ name, roll, email, password: hashed });
  res.status(201).json({ id, name, roll, email });
}

async function createPermission(req, res) {
  const { title, description, hours_from, hours_to } = req.body;
  const newId = await Permission.create({
    user_id: req.user.id,
    title,
    description,
    hours_from,
    hours_to
  });
  res.status(201).json({ id: newId });
}

async function getAllPermissions(req, res) {
  const perms = await Permission.findByUser(req.user.id);
  res.json(perms);
}

async function getPermissionById(req, res) {
  const perm = await Permission.findById(req.params.id);
  res.json(perm);
}

async function profile(req, res) {
  const user = await User.findById(req.user.id);
  res.json(user);
}

module.exports = { signup, createPermission, getAllPermissions, getPermissionById, profile };