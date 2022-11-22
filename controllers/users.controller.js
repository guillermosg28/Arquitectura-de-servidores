const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.store = (req, res, next) => {

    const data = { text } = req.body

    User.create({
        ...data,
    })
        .then(user => res.status(201).json(user))
        .catch(next)
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, email, validations) => {
        console.log(req.login);
        if (error) {
            next(error);
        } else if (!email) {
            next(createError(400, validations))
        } else {
            req.login(email, error => {
                if (error) next(error)
                else res.json(email)
            })
        }
    })(req, res, next);
};