const path = require('path');
const fs = require('fs');

// Post model
const Post = require('../models/Post');
// Validation
const validatePostInput = require('../validation/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ msg: 'No posts found' });
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ msg: 'No post found with that ID' });
  }
}

exports.createPost = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  if (!req.file) {
    errors.file = "Choose an image";
    return res.status(400).json(errors);
  }

  try {
    const newPost = new Post({
      image: req.file.path,
      text: req.body.comment,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    await newPost.save();
    res.json({ msg: "Created successfully" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ notauthorized: 'User not authorized' });
    }

    await post.remove();

    const file_path = path.resolve(__dirname, '../', post.image);

    try {
      fs.unlinkSync(file_path);
    } catch (error) {
      console.log(error);
    }

    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: 'No post found' });
  }
}

exports.comment = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  if (!req.file) {
    errors.file = "Choose an image";
    return res.status(400).json(errors);
  }

  try {
    const post = await Post.findById(req.params.id);

    const newComment = {
      image: req.file.path,
      text: req.body.comment,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    // Save
    await post.save();

    res.json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: 'No post found' });
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return res
        .status(404)
        .json({ msg: 'Comment does not exist' });
    }

    // Get remove index
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

    // console.log(post.comments[removeIndex].image)
    const file_path = path.resolve(__dirname, '../', post.comments[removeIndex].image);

    try {
      fs.unlinkSync(file_path);
    } catch (error) {
      console.log(error);
    }

    // Splice comment out of array
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json({ msg: "success" });
  } catch (error) {
    res.status(404).json({ msg: 'No post found' });
  }
}