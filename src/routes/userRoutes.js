const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  signup,
  createPermission,
  getAllPermissions,
  getPermissionById,
  profile
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/permission', auth, role('user'), createPermission);
router.get('/permissions', auth, role('user'), getAllPermissions);
router.get('/permission/:id', auth, role('user'), getPermissionById);
router.get('/profile', auth, role('user'), profile);

module.exports = router;