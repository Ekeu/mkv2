const asyncHandler = require('express-async-handler');
const Food = require('../models/foodModel');

// @desc Fetch all foods
// @route GET /api/foods
// @access Public
const getFoods = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const foods = await Food.find({...keyword});
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

// @desc Delete food
// @route DELETE /api/foods/:_id
// @access Private/admin
const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params._id);

  if (food) {
    await food.remove()
    res.json({message: 'Food removed'})
  } else {
    res.status(404);
    throw new Error("La chop la n'existe pas encore");
  }
});

// @desc Create Food
// @route POST /api/foods
// @access Private/admin
const createFood = asyncHandler(async (req, res) => {
  const food = new Food({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    imageUrl: '/images/food/default.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    availability: true,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdFood = await food.save()
  res.status(201).json(createdFood)
});

// @desc Update Food
// @route PUT /api/foods/:_id
// @access Private/admin
const updateFood = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, availability} = req.body
  const food = await Food.findById(req.params._id)
  if(food) {
    food.name = name
    food.price = price
    food.description = description
    food.imageUrl = image
    food.brand = brand
    food.category = category
    food.availability = availability

    const updatedFood = await food.save()
    res.status(201).json(updatedFood)
    
  }else {
    res.status(404)
    throw new Error('La nourriture est introuvable')
  }
});

// @desc New Review
// @route POST /api/foods/:_id/reviews
// @access Private
const createFoodReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body
  const food = await Food.findById(req.params._id)
  if(food) {
    const alreadyReviewed = food.reviews.find(review => review.user.toString() === req.user._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Food already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      email: req.user.email,
      comment,
      user: req.user._id
    }
    food.reviews.push(review)
    food.numReviews = food.reviews.length
    food.rating = (food.reviews.reduce((acc, item) => item.rating + acc, 0)/food.reviews.length)

    await food.save()
    res.status(201).json({message: 'Review added'})
  }else {
    res.status(404)
    throw new Error('La nourriture est introuvable')
  }
});

module.exports = {
    getFoods,
    getFoodById,
    deleteFood,
    createFood,
    createFoodReview,
    updateFood
}
