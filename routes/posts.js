const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { authenticateToken } = require("../utils/jwt");

// create a post
router.post("/", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const newPost = new Post({
    ...req.body,
    user: user._id,
    name: user.name,
    username: user.username,
    profilePic: user.profilePic,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ post: savedPost });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// update post
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== req.user.userId)
      return res.status(403).json({ message: "You can only delete your post" });

    const { userId, likes, ...other } = req.body;
    await post.updateOne({ $set: other });
    return res.status(200).json({ message: "Post updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});

// delete post
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== req.user.userId)
      return res.status(403).json({ message: "You can only delete your post" });

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});

// like post
router.put("/:id/like", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user.userId)) {
      await post.updateOne({ $pull: { likes: req.user.userId } });
      await post.save();
      return res.status(200).json({ message: "Post has been unliked" });
    }
    await post.updateOne({ $push: { likes: req.user.userId } });
    await post.save();
    return res.status(200).json({ message: "Post has been liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});

// get timeline posts
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "user",
        select: "name username profilePic",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// get timeline posts
router.get("/followed", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const userPosts = await Post.find({ user: user._id }).populate({
      path: "user",
      select: "name username profilePic",
    });
    const friendPosts = await Promise.all(
      user.following.map(
        async (friendId) =>
          await Post.find({ user: friendId }).populate({
            path: "user",
            select: "name username profilePic",
          })
      )
    );
    return res
      .status(200)
      .json(
        userPosts
          .concat(...friendPosts)
          .sort((a, b) => b.createdAt - a.createdAt)
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// get user posts
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ user: id })
      .populate({
        path: "user",
        select: "name username profilePic",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// get saved posts
router.get("/saved", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const posts = await Promise.all(
      user.savedPosts.map(
        async (post) =>
          await Post.findById(post)
            .populate({
              path: "user",
              select: "name username profilePic",
            })
            .sort({ createdAt: -1 })
      )
    );
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
});

router.post("/save/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    console.log(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const user = await User.findById(req.user.userId);

    if (user.savedPosts.includes(id)) {
      await user.updateOne({ $pull: { savedPosts: id } });
      await user.save();

      return res
        .status(200)
        .json({ message: "Post unsaved successfully " + id });
    }
    await user.updateOne({ $push: { savedPosts: id } });
    await user.save();

    return res.status(200).json({ message: "Post saved successfully " + id });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
});

// get post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate({
      path: "user",
      select: "name username profilePic",
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});



module.exports = router;
