// src/Room.js

class Room {
  static ROOMS = [];
  pin;
  type;
  admin;

  constructor(pin, type, admin) {
    this.pin = pin;
    this.type = type;
    this.admin = admin;
  }

  /**
   * Check if pin exists
   *
   * @param {string} result
   * @return {boolean}
   */
  static checkPin(result) {
    return Room.ROOMS.find(({ pin }) => pin === result) === undefined
      ? false
      : true;
  }

  /**
   * Create a new pin
   *
   * @param {number} length
   * @return {string}
   */
  static generatePin(length) {
    const characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    let result;
    do {
      result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    } while (Room.checkPin(result));
    return result;
  }

  /**
   * Create a new Room
   *
   * @param {number} type
   * @param {string} id
   * @return {string}
   */
  static createRoom(type, id) {
    let pin = Room.generatePin(5);
    if (type === 0 || type === 1) {
      Room.ROOMS.push(new Room(pin, type, id));
    } else {
      Room.ROOMS.push(new Room(pin, 0, id));
    }
    return pin;
  }

  /**
   * Join a new Room
   *
   * @param {string} pin
   */
  static joinRoom(pin) {}
}

module.exports = Room;
