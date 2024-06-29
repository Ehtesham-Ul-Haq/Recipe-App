const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');
const { getRecentlyViewedRecipes, getSavedFavorites } = require('../controllers/recipeController');
const User = require('../models/User');

const router = express.Router();



// Endpoint for searching recipes
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Example search query for recipes based on name, ingredients,
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by recipe name
        { ingredients: { $regex: query, $options: 'i' } }
      ]
    }).exec();



    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




// Add a new recipe
router.post(
  '/addrecipe',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('ingredients', 'Ingredients are required').isArray({ min: 1 }),
      check('instructions', 'Instructions are required').isArray({ min: 1 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, ingredients, instructions } = req.body;

    try {
      const newRecipe = new Recipe({
        name,
        description,
        ingredients,
        instructions,
        user: req.user.id,
      });

      const recipe = await newRecipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all recipes of a single user
router.get('/userrecipes/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const recipes = await Recipe.find({ user: userId });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Endpoint for getting all recipes with pagination, (social feed)
router.get('/allrecipes', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    const recipes = await Recipe.find().populate('user', ['name'])
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      recipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching recipes with pagination:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});





// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', ['name']);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Check user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update recipe
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('ingredients', 'Ingredients are required').isArray({ min: 1 }),
      check('instructions', 'Instructions are required').isArray({ min: 1 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, ingredients, instructions } = req.body;

    try {
      let recipe = await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).json({ msg: 'Recipe not found' });
      }

      // Check user
      if (recipe.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      recipe.name = name;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;

      recipe = await recipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
      res.status(500).send('Server error');
    }
  }
);







// routes for get recently viewed recipes and favorites for a user

router.get('/recently-viewed/:userId', auth, getRecentlyViewedRecipes);
router.get('/favorites/:userId', auth, getSavedFavorites);




// review routes start here

// Add a review to a recipe
router.post('/:recipeId/reviews', async (req, res) => {
  const { recipeId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const review = {
      userId,
      rating,
      comment,
      timestamp: new Date()
    };

    recipe.reviews.push(review);
    await recipe.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});





// Fetch all reviews for a recipe
router.get('/:recipeId/reviews', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId).populate('reviews.userId', 'name');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// // Update a review
router.put('/:recipeId/reviews/:reviewId', async (req, res) => {
  const { recipeId, reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const review = recipe.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;
    review.timestamp = new Date();

    await recipe.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
