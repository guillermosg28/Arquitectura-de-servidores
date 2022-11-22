const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller')

router.post('/posts', posts.store)
router.get('/posts', posts.index)
router.get('/posts/:id', posts.detail);
router.patch('/posts/:id', posts.update);
router.delete('/posts/:id', posts.delete)

module.exports = router;