const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  getPermissionById,
  approvePermission,
  getApprovedList,
  profile
} = require('../controllers/teacherController');

router.get('/permission/:id', auth, role('teacher'), getPermissionById);
router.put('/permission/:id/approve', auth, role('teacher'), approvePermission);
router.get('/permissions/approved', auth, role('teacher'), getApprovedList);
router.get('/profile', auth, role('teacher'), profile);

module.exports = router;