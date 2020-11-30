const express = require('express');
const router = express.Router();
const { getFoods, getFoodById } = require('../controllers/foodController')

router.route('/').get(getFoods);
router.route('/:_id').get(getFoodById);

module.exports = router;
