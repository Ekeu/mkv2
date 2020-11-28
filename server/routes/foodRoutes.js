const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Food = require('../models/foodModel');

// @desc Fetch all foods
// @route GET /api/foods
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const foods = await Food.find({});
    res.json(foods);
  })
);

// @desc Fetch single food
// @route GET /api/foods/:_id
// @access Public
router.get(
  '/:_id',
  asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params._id);

    if (food) {
      res.json(food);
    } else {
      res.status(404);
      throw new Error("La chop la n'existe pas encore")
    }
  })
);

module.exports = router;
