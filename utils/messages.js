const Message = require("../models/Message");

const getMostRecentMessages = async () => {
  return await Message.find().sort({ _id: -1 }).limit(10);
};

module.exports = { getMostRecentMessages };
