const asyncHandler = require('express-async-handler');
const { findById } = require('../models/orderModel');
const Order = require('../models/orderModel');

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderFoods = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    foodsPrice,
    taxPrice,
    shippingPrice,
    shouldShip,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No ordered food');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      foodsPrice,
      taxPrice,
      shippingPrice,
      shouldShip,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get Order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
  }
});


// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id);

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404);
  }
});

module.exports = {
  addOrderFoods,
  getOrderById,
  updateOrderToPaid
};
