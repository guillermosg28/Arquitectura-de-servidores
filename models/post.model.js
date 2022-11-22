const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    title: {
        type: String,
        required: 'El campo [Titulo] es requerido.',
        minlength: 5,
    },
    text: {
        type: String,
        required: 'El campo [Texto] es requerido.',
        minlength: 5,
    },
    author: {
        type: String,
        required: 'El campo [Autor] es requerido.',
    },
}, {
    timestamps: true,
});


const Post = mongoose.model('Post', schema);
module.exports = Post;