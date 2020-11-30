const asyncHandler = require('express-async-handler');
const Food = require('../models/foodModel');

// @desc Fetch all foods
// @route GET /api/foods
// @access Public
const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find({});
  res.json(foods);
});

// @desc Fetch single food
// @route GET /api/foods/:_id
// @access Public
const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params._id);

  if (food) {
    res.json(food);
  } else {
    res.status(404);
    throw new Error("La chop la n'existe pas encore");
  }
});

module.exports = {
    getFoods,
    getFoodById
}
