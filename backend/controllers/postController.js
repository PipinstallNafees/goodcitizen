import Post from "../models/Post.js";
import User from "../models/User.js";
import sendReportEmail from "../utils/sendReportEmail.js";

const getAllPosts = async (req, res) => {
  try {
    const { city, category } = req.query;

    const filter = {};
    if (city) filter.city = { $regex: city, $options: "i" };
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts.", error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, category, description, city, state } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const post = await Post.create({
      title,
      category,
      description,
      city,
      state,
      author: req.userId,
      imageUrl,
    });

    // Fetch author details to get name and email for the notification
    const author = await User.findById(req.userId);

    // Send email in background — don't await so it doesn't slow down the response
    sendReportEmail({
      authorName:  author.name,
      authorEmail: author.email,
      title,
      category,
      description,
      city,
      state,
      imageUrl: imageUrl ? `http://localhost:5000/${imageUrl}` : null,
    }).catch((err) => console.error("Email sending failed:", err.message));

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: "Failed to create post.", error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to edit this post." });
    }

    const { title, category, description, city, state } = req.body;
    post.title       = title       || post.title;
    post.category    = category    || post.category;
    post.description = description || post.description;
    post.city        = city        || post.city;
    post.state       = state       || post.state;

    if (req.file) {
      post.imageUrl = req.file.path.replace(/\\/g, "/");
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post.", error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this post." });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post.", error: err.message });
  }
};

export { getAllPosts, createPost, updatePost, deletePost };