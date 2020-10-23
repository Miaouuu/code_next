// src/server.js

const express = require("express")();
const server = require("http").Server(express);
const io = require("socket.io")(server);
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { createRoom, joinRoom } = require("./controller");

io.on("connect", (socket) => {
  socket.on("CREATE_ROOM", (type) => createRoom(type, socket));
  socket.on("JOIN_ROOM", (pin) => joinRoom(pin, socket));
});

app.prepare().then(() => {
  express.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
