const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validatorPackage = require('validator')
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validatorPackage.isEmail,
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: true,
        match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    bio: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

schema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', schema);
module.exports = User;