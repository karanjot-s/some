const express = require("express");
const app = express();

// imports
const mongoose = require("mongoose");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const socketHandler = require("./routes/socket");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const imageRouter = require("./routes/images");
const searchRouter = require("./routes/search");
const { cloudConfig } = require("./utils/images");

dotenv.config();
const PORT = process.env.PORT || 8800;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("MongoDB Connected");
});

cloudConfig();

// middlewares
app.use(express.json()); // parses incoming request to return in json
app.use(helmet()); // security headers
app.use(morgan("common")); // logger
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", socketHandler);

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/image", imageRouter);
app.use("/api/search", searchRouter);

app.get("/", (req, res) => {
  return res.send("Homepage");
});

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
