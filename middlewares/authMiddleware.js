const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!req.user) {
      req.user = await User.findById(decoded.id).select('_id name role');
    }

    if (!req.user) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
