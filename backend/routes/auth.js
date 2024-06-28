const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');
const JWT_SECRET="RecipeRadiance"

dotenv.config();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token, user) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});




// GET user by ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// PUT update user
router.put('/updateUser/:userId', async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email },
      { new: true } // Return the updated user object
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Endpoint to update recently viewed recipes for a user

router.post('/recently-viewed', async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if recipeId is already in recentlyViewedRecipes array
    if (!user.recentlyViewedRecipes.includes(recipeId)) {
      // Add recipeId to recentlyViewedRecipes array
      user.recentlyViewedRecipes.unshift(recipeId); // Add at the beginning (most recent)
      await user.save();
    }

    res.status(200).json({ message: 'Recently viewed recipe updated successfully' });
  } catch (error) {
    console.error('Error updating recently viewed recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




// Endpoint to save a recipe as favorite for a user

router.post('/favorite', async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if recipeId is already in favorites array
    if (!user.favorites.includes(recipeId)) {
      // Add recipeId to favorites array
      user.favorites.push(recipeId);
      await user.save();
    }

    res.status(200).json({ message: 'Recipe saved as favorite successfully' });
  } catch (error) {
    console.error('Error saving favorite recipe:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});






module.exports = router;
