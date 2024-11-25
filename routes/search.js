const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { authenticateToken } = require("../utils/jwt");

//search post and users using query
router.get("/all", async (req, res) => {
  const { q } = req.query;
  try {
    const posts = await Post.find({
      desc: { $regex: q, $options: "i" },
    })
      .populate({
        path: "user",
        select: "name username profilePic",
      })
      .sort({ createdAt: -1 });

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    })
      .limit(5)
      .select("name username profilePic");

    return res.status(200).json({ posts, users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});

// search users
router.get("/users", async (req, res) => {
  const { q } = req.query;
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    }).select("name username profilePic");

    return res.status(200).json({ users, posts: [] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
});

module.exports = router;
