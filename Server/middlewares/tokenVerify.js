const jwt = require('jsonwebtoken');

module.exports.tokenVerify =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // check header
      if (!authHeader) {
        return res.status(403).json({ message: 'Authentication failed' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'Authentication failed' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).json({ message: 'Authentication failed' });
        }

        // role check
        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        // attach user data
        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
