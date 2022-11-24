const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')
const sec = require('../middlewares/secure.middleware')

/** Post */
router.post('/posts', sec.auth, posts.store)
router.get('/posts', sec.auth, posts.index)
router.get('/posts/:id', sec.auth, posts.detail);
router.patch('/posts/:id', sec.auth, posts.update);
router.delete('/posts/:id', sec.auth, posts.delete)

/**User */
router.post('/users', users.store)
router.get('/activate', sec.auth_activate, users.activate)

/**Auth */
router.post('/login', users.login)

module.exports = router;