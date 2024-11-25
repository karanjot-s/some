const Chatlist = require("../models/Chatlist");
const Message = require("../models/Message");
const User = require("../models/User");

const activeUsers = new Map();

module.exports = (socket) => {
  console.log(`New client connected to ${socket.id}`);

  let currentUser = null;

  socket.on("login", (userId) => {
    console.log(`User ${userId} logged in`);
    activeUsers.set(userId, socket.id);
    currentUser = userId;
  });

  socket.on("send message", async ({ to, message }, callback) => {
    const receiverSocketId = activeUsers.get(to);
    const currentUserSocketId = activeUsers.get(currentUser);
    if (!currentUser) return;

    // check if this is the first message between the two users
    // if yes, create a new chatlist entry
    // if no, do nothing
    const chatlistEntry = await Chatlist.findOne({
      $or: [
        { user1: currentUser, user2: to },
        { user1: to, user2: currentUser },
      ],
    });

    if (!chatlistEntry) {
      const chatlist = Chatlist({
        user1: currentUser,
        user2: to,
      });
      await chatlist.save();
    }

    try {
      const msg = new Message({
        from: currentUser,
        to,
        messageText: message,
      });

      // console.log("saving");
      await msg.save();
      // console.log(x);

      // console.log("saved");
      if (to)
        socket
          .to(receiverSocketId)
          .emit("message received", { message, to, from: currentUser });
      callback({
        status: "ok",
        message,
      });
    } catch (err) {
      console.log(err);
      callback({
        status: "not ok",
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
    activeUsers.delete(currentUser);
  });
};
