const express = require("express");
const http = require("http");
const io = require("socket.io");
let {start}=require('./fourierTransform/channelArray')
const port =  4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const socket = io(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }); // < Interesting!

let interval;

socket.on("connection", (sock) => {
    start(sock)
    sock.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(port, () => console.log(`Listening on port ${port}`));
