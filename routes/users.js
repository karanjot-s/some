const Chatlist = require("../models/Chatlist");
const Message = require("../models/Message");
const User = require("../models/User");
const { hash } = require("../utils/hashing");
const { authenticateToken } = require("../utils/jwt");

const router = require("express").Router();

router.get("/chat", authenticateToken, async (req, res) => {
  try {
    const currentUserId = req.query.from;
    const otherUserId = req.query.to;

    if (!currentUserId)
      return res.status(406).json({ message: "Provide currentUserId" });
    if (!otherUserId)
      return res.status(406).json({ message: "Provide otherUserId" });

    const fromUser = await User.findById(currentUserId);
    const toUser = await User.findById(otherUserId);

    if (!fromUser || !toUser)
      return res.status(404).json({ message: "User Not found" });

    const chatListCurrentUser = await Message.find({
      to: otherUserId,
      from: currentUserId,
    });
    const formattedChatListUser = chatListCurrentUser.map((msg) => ({
      type: "user",
      message: msg.messageText,
      time: msg.createdAt,
    }));

    const chatListOtherUser = await Message.find({
      to: currentUserId,
      from: otherUserId,
    });
    const formattedChatListOther = chatListOtherUser.map((msg) => ({
      type: "other",
      message: msg.messageText,
      time: msg.createdAt,
    }));

    console.log(formattedChatListUser, formattedChatListOther);

    const chatList = formattedChatListUser
      .concat(formattedChatListOther)
      .sort((a, b) => a.time - b.time);

    return res.status(200).json(chatList);
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ message: "Server Error", err });
  }
});

router.get("/chatlist", authenticateToken, async (req, res) => {
  try {
    // get all users
    const users = await User.find({});

    // get users who are in the following and followers list of current user
    const currentUser = await User.findById(req.user.userId);
    const following = currentUser.following;
    const followers = currentUser.followers;

    const chatList = await Chatlist.find({
      $or: [{ user1: currentUser._id }, { user2: currentUser._id }],
    });
    const chats = chatList.map((chat) => {
      console.log("req user", req.user.userId);
      const user = users.find((user) => {
        console.log("user", user._id);
        console.log("chat", chat.user1, chat.user2);
        console.log(user._id.equals(chat.user2));
        return (
          (user._id.equals(chat.user1) || user._id.equals(chat.user2)) &&
          !user._id.equals(req.user.userId)
        );
      });

      console.log("user", user);
      return {
        name: user.name || user.username,
        id: user._id,
        img: user.profilePic,
      };
    });

    const friends = users
      .filter((user) => {
        return (
          user._id != req.user.userId &&
          following.includes(user._id) &&
          followers.includes(user._id)
        );
      })
      .map((user) => {
        return {
          name: user.name || user.username,
          id: user._id,
          img: user.profilePic,
        };
      });

    return res.status(200).json({ chats, friends });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ message: "Server Error", err });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const { email, isAdmin, password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const admin = false;
    if (req.user.userId != user._id) {
      const otherUser = await User.findById(req.user.userId);
      admin = otherUser.isAdmin;
      if (!admin)
        return res
          .status(401)
          .json({ message: "You can only update your profile" });
    }
    const { password, isAdmin, disabled, ...others } = req.body;
    if (!admin && isAdmin)
      return res
        .status(401)
        .json({ message: "Only an admin can change admin status" });
    if (disabled != undefined)
      return res.status(400).json({ message: "go to /user/:id/disable" });

    if (!password)
      await user.updateOne({
        $set: { ...others, isAdmin },
      });
    else {
      const hashedPassword = await hash(password);
      await user.updateOne({
        $set: { ...others, isAdmin, password: hashedPassword },
      });
    }

    return res.status(200).json({ message: "Account has been updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.user.userId != user._id) {
      const otherUser = await User.findById(req.user.userId);
      if (!otherUser.isAdmin)
        return res
          .status(401)
          .json({ message: "You can only disable your profile" });
    }

    if (user.disabled)
      return res
        .status(400)
        .json({ message: "Your account is already disabled" });

    user.updateOne({ $set: { disabled: true } });
    res.status(200).json({ message: "Account has been disabled" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

router.put("/:id/enable", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.user.userId != user._id) {
      const otherUser = await User.findById(req.user.userId);
      if (!otherUser.isAdmin)
        return res
          .status(401)
          .json({ message: "You can only enable your profile" });
    }

    if (user.disabled)
      return res
        .status(400)
        .json({ message: "Your account is already enabled" });

    user.updateOne({ $set: { disabled: false } });
    res.status(200).json({ message: "Account has been enabled" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
});

router.put("/:id/follow", authenticateToken, async (req, res) => {
  if (req.user.userId === req.params.id)
    return res.status(403).json({ message: "You cannot follow yourself" });

  try {
    const currUser = await User.findById(req.user.userId);
    const user = await User.findById(req.params.id);

    if (user.followers.includes(req.user.userId))
      return res.status(403).json({ message: "You already follow this user" });

    await user.updateOne({ $push: { followers: currUser._id } });
    await currUser.updateOne({ $push: { following: user._id } });

    return res.status(200).json({ message: "User followed successfully" });
  } catch (err) {}
});

router.put("/:id/unfollow", authenticateToken, async (req, res) => {
  if (req.user.userId === req.params.id)
    return res.status(403).json({ message: "You cannot unfollow yourself" });

  try {
    const currUser = await User.findById(req.user.userId);
    const user = await User.findById(req.params.id);

    if (!user.followers.includes(req.user.userId))
      return res.status(403).json({ message: "You don't follow this user" });

    await user.updateOne({ $pull: { followers: currUser._id } });
    await currUser.updateOne({ $pull: { following: user._id } });

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {}
});

module.exports = router;
