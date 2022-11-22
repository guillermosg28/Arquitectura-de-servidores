const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, next) => {
    next(null, user.id);
});

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => next(null, user))
        .catch(next);
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, next) => {
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                next(null, null, { message: 'Invalid email or password' })
            } else {
                return user.checkPassword(password)
                    .then(match => {
                        if (match) {
                            next(null, user)
                        } else {
                            var e = new Error('Invalid email or password');
                            e.status = 401;
                            next(e)
                        }
                    })
            }
        }).catch(next)
}));