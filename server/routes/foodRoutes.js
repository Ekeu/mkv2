const express = require('express');
const router = express.Router();
const {
  getFoods,
  getFoodById,
  deleteFood,
  createFood,
  createFoodReview,
  updateFood,
  getTopProducts,
} = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getFoods).post(protect, admin, createFood);
router.route('/:_id/reviews').post(protect, createFoodReview);
router.get('/top', getTopProducts)
router
  .route('/:_id')
  .get(getFoodById)
  .delete(protect, admin, deleteFood)
  .put(protect, admin, updateFood);

module.exports = router;
