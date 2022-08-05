// Post model
const Post = require('../models/Post');
// Validation
const validatePostInput = require('../validation/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts)
  } catch (error) {
    res.status(404).json({ msg: 'No posts found' })
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts)
  } catch (error) {
    res.status(404).json({ msg: 'No posts found' })
  }
}