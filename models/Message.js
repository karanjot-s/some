const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    // conversationId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    // sender: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messageText: {
      type: String,
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

module.exports = mongoose.model("Message", messageSchema);
