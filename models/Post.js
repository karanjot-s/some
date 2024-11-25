const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    // name: {
    //   type: String,
    //   require: true,
    //   default: "no-name",
    // },
    // username: {
    //   type: String,
    //   require: true,
    // },
    // profilePic: {
    //   type: String,
    //   require: true,
    //   default: "",
    // },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
