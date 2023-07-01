const { sendOtp, verifyOtp, activate, refresh, logOut } = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth-middleware');
const router = require('express').Router()

router.post('/sendOtp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/activate',authMiddleware, activate)
router.get('/refresh-token', refresh)
router.post('/logout', logOut)
module.exports = router; 
