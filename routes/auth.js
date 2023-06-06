const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { createJWT, verifyToken, authenticateToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const { hash, validate } = require("../utils/hashing");
const { errors } = require("../errors");

router.get("/", (req, res) => {
  return res.send("Hello from auth");
});

router.post("/register", async (req, res) => {
  const { username, email, password, name, bio, profilePic } = req.body;

  if (!username)
    return res.status(400).json({
      message: "Username not found",
    });

  if (!email)
    return res.status(400).json({
      message: "Email not found",
    });

  if (!password)
    return res.status(400).json({
      message: "Password not found",
    });

  try {
    const hashedPassword = await hash(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      bio,
      profilePic,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json(errors.UserNotFound);

    const validPassword = await validate(password, user.password);
    if (!validPassword) return res.status(400).json(errors.IncorrectPassword);

    const token = createJWT(user.email, user._id, 3600);

    const decodedToken = verifyToken(token);

    if (decodedToken) return res.status(200).json({ token, user });

    throw "Decoded token not found";
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      err: err,
    });
  }
});

router.get("/check-name-email", async (req, res) => {
  const { username, email } = req.query;
  const user1 = await User.findOne({ username });
  if (user1)
    return res.status(302).json({ for: "username", message: "Username found" });
  const user2 = await User.findOne({ email });
  if (user2)
    return res.status(302).json({ for: "email", message: "Email found" });

  return res.status(200).json({ message: "Username and email not found" });
});

router.get("/user", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);

  return res.status(200).json({ user });
});

module.exports = router;
