const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatlistSchema = new Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Chatlist", chatlistSchema);
