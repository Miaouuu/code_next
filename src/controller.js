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
  socket.join(pin.toUpperCase());
  socket.emit("RES_CREATE_ROOM", pin);
};

/**
 * Join a Room
 *
 * @param {string} pin
 * @param {SocketIO.Socket} socket
 */
const joinRoom = (pin, socket) => {
  let { exist, type } = Room.checkRoom(pin.toUpperCase());
  if (exist) {
    socket.join(pin.toUpperCase());
    socket.emit("RES_JOIN_ROOM", {valid: true, type});
  } else {
    socket.emit("RES_JOIN_ROOM", false);
  }
};

/**
 * Check if room exists
 *
 * @param {string} pin
 * @param {SocketIO.Socket} socket
 */
const checkRoom = (pin, socket) => {
  let { exist } = Room.checkRoom(pin.toUpperCase());
  socket.emit("RES_CHECK_ROOM", exist);
};

/**
 * Send code to all
 *
 * @param {string} type
 * @param {string} code
 * @param {string} id
 * @param {SocketIO.Server} io
 */
const sendCode = (type, code, id, io) => {
  let adminIndex = Room.getRoomIndexWithAdmin(id);
  let resultCode = Room.ROOMS[adminIndex].updateResultCode(type, code);
  io.to(Room.ROOMS[adminIndex].pin).emit("RES_SEND_CODE", resultCode);
};

/**
 * Send code to someone
 *
 * @param {string} pin
 * @param {SocketIO.Socket} socket
 */
const getResult = (pin, socket) => {
  let adminIndex = Room.getRoomIndexWithPin(pin.toUpperCase());
  socket.emit("RES_GET_RESULT", Room.ROOMS[adminIndex].resultCode);
};

const sendSolution = (order, pin, io) => {
  io.to(pin.toUpperCase()).emit("RES_SEND_RESOLUTION", order)
}

module.exports = { createRoom, joinRoom, checkRoom, sendCode, getResult, sendSolution };
