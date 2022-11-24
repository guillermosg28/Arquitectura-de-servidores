const createError = require('http-errors');

module.exports.auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.active) {
      next();
    } else {
      res.status(200).json({message: "User not activated"})
    }

  } else {
    next(createError(401, 'user is not authenticated'))
  }
};

module.exports.auth_activate = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401, 'user is not authenticated'))
  }
};

module.exports.self = function (req, res, next) {
  if (req.params.id == req.user.id) {
    next();
  } else {
    next(createError(403, 'forbidden'))
  }
};
