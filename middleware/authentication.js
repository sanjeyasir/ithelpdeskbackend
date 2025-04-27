const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.TOKEN_SECRET; 

const authenticateToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      // Attach user info to request
      req.user = user;

      next(); // proceed to next middleware or route handler
    });

  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ message: 'Failed to authenticate token.' });
  }
};

module.exports = authenticateToken;
