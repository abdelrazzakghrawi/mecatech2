const express = require('express');
const { register, login, googleLogin ,getUserProfile, updateUserProfile,verifyEmail } = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../utils/passport');

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);

router.get('/verify-email/:userId', verifyEmail);


router.route('/me')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);


module.exports = router;