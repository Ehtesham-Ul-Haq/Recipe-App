const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const JWT_SECRET="RecipeRadiance"

dotenv.config();

module.exports = function (req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
