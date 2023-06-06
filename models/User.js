const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      max: 50,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      max: 20,
      min: 8,
      require: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    savedPosts: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
