const createError = require('http-errors');
const Post = require('../models/post.model');

module.exports.index = (req, res, next) => {

  Post.find()
    .then(posts => res.json(posts))
    .catch(next);
}

module.exports.store = (req, res, next) => {

  const data = { text } = req.body

  Post.create({
    ...data,
  })
    .then(post => res.status(201).json(post))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        next(createError(404, 'Post not found'))
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const data = { title, text, author } = req.body

  Post.findByIdAndUpdate(id, data, { new: true })
    .then(post => res.status(200).json(post))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(post => res.status(204).end())
    .catch(next)
}
