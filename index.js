const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 4000;
const router = require("./router");
// const { addUser, removeUser, getUser, getUserInRoom } = require("./user");
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(router);
//using socket io connection for live response
io.on("connection", (socket) => {
  // console.log("we have a new connection");

  socket.on("greet", (msg) => {
    console.log(msg);
  });
  socket.on("send", (message) => {
    console.log(message);
    socket.broadcast.emit("receive", message);
  });

  socket.on("disconnect", (name) => {
    console.log(name, "is left");
  });
});

server.listen(PORT, () => console.log(`server is runnig on PORT ${PORT}`));
