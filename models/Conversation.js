const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convoSchema = new Schema(
  {
    participants: [String],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Conversation", convoSchema);
