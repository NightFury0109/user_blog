const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/isAuth');

const { getPosts, getPost, createPost, deletePost, comment, deleteComment } = require('../../controllers/posts');

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', getPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', getPost);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', isAuth, createPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', isAuth, deletePost);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', isAuth, comment);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', isAuth, deleteComment);

module.exports = router;
