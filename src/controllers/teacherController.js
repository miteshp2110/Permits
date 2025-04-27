const Permission = require('../models/Permission');

async function getPermissionById(req, res) {
  const perm = await Permission.findById(req.params.id);
  res.json(perm);
}

async function approvePermission(req, res) {
  await Permission.approve(req.params.id, req.user.id);
  res.json({ message: 'Approved' });
}

async function getApprovedList(req, res) {
  const perms = await Permission.findByTeacher(req.user.id);
  res.json(perms);
}

async function profile(req, res) {
  const teacher = await require('../models/Teacher').findById(req.user.id);
  res.json(teacher);
}

module.exports = { getPermissionById, approvePermission, getApprovedList, profile };