// src/controller.js

const Room = require("./Room");

/**
 * Create a new Room and send pin
 *
 * @param {number} type
 * @param {SocketIO.Socket} socket
 */
const createRoom = (type, socket) => {
  let pin = Room.createRoom(type, socket.id);
  socket.join(pin);
  console.log(Room.ROOMS);
  socket.emit("RES_CREATE_ROOM", pin);
};

/**
 * Join a Room
 *
 * @param {string} pin
 * @param {SocketIO.Socket} socket
 */
const joinRoom = (pin, socket) => {};

module.exports = { createRoom, joinRoom };
