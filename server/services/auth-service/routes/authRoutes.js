const express = require('express');
const { register, login, googleLogin ,getUserProfile, updateUserProfile,verifyEmail , getUserById} = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../utils/passport');

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);

router.get('/verify-email/:userId', verifyEmail);


router.route('/me')
.get(protect, getUserProfile)
.put(protect, upload.single('profileImage'), updateUserProfile); // Utilisation de `multer` ici
router.get('/details/:userId', getUserById);
router.get('/details/:userId', getUserById);
router.get('/me/image', protect, (req, res) => {
    res.json({ profileImage: req.user.profileImage });
  });
  



module.exports = router;