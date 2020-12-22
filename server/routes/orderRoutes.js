const express = require('express');
const router = express.Router();
const { addOrderFoods, getOrderById, updateOrderToPaid } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderFoods);
router.route('/:_id').get(protect, getOrderById);
router.route('/:_id/pay').put(protect, updateOrderToPaid);

module.exports = router;
