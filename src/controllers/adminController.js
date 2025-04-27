const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Permission = require('../models/Permission');

async function createAdmin(req, res) {
  const { name, position, empId, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = await Admin.create({ name, position, empId, email, password: hashed });
  res.status(201).json({ id, name, position, empId, email });
}

async function profile(req, res) {
  const admin = await Admin.findById(req.user.id);
  res.json(admin);
}

async function getAllPermissions(req, res) {
  const perms = await Permission.findAll();
  res.json(perms);
}

async function getPermissionById(req, res) {
  const perm = await Permission.findById(req.params.id);
  res.json(perm);
}

async function authorizePermission(req, res) {
  await Permission.authorize(req.params.id, req.user.id);
  res.json({ message: 'Authorized' });
}

async function addTeacher(req, res) {
  const { name, empId, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = await Teacher.create({ name, empId, email, password: hashed });
  res.status(201).json({ id, name, empId, email });
}

module.exports = { createAdmin, profile, getAllPermissions, getPermissionById, authorizePermission, addTeacher };