const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  createAdmin,
  profile,
  getAllPermissions,
  getPermissionById,
  authorizePermission,
  addTeacher
} = require('../controllers/adminController');

router.post('/admin', auth, role('admin'), createAdmin);
router.post('/teacher', auth, role('admin'), addTeacher);
router.put('/permission/:id/authorize', auth, role('admin'), authorizePermission);
router.get('/permissions', auth, role('admin'), getAllPermissions);
router.get('/permission/:id', auth, role('admin'), getPermissionById);
router.get('/profile', auth, role('admin'), profile);

module.exports = router;