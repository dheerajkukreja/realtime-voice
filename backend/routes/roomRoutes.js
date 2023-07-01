const { createRoom, getRoom } = require('../controllers/roomsController');
const authMiddleware = require('../middlewares/auth-middleware');

const router = require('express').Router()

router.post('/',authMiddleware, createRoom)
router.get('/',authMiddleware, getRoom)
module.exports = router; 
