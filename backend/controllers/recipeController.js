const User = require('../models/User');
// const Recipe = require('../models/Recipe');

// Get Recently Viewed Recipes
exports.getRecentlyViewedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('recentlyViewedRecipes');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.recentlyViewedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Saved Favorites
exports.getSavedFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
