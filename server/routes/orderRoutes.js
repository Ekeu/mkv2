const express = require('express');
const router = express.Router();
const { addOrderFoods, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderFoods).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:_id').get(protect, getOrderById);
router.route('/:_id/pay').put(protect, updateOrderToPaid);
router.route('/:_id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;