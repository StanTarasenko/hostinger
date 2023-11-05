const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(403).json({message: "No token"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({message: "No access"})
      }
      req.user = decoded
      next()
  
    } catch (err) {
      res.status(403).json({message: "User is Unauthorized!"})
    }
  };
};