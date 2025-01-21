/**
 * Middleware to restrict access based on user roles.
 */
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
      }
      next();
  };
};

module.exports = authorizeRole;
