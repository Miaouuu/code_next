// src/Room.js

class Room {
  static ROOMS = [];
  pin;
  type;
  admin;
  htmlCode;
  cssCode;
  jsCode;
  resultCode;

  constructor(pin, type, admin) {
    this.pin = pin;
    this.type = type;
    this.admin = admin;
    this.htmlCode = "";
    this.cssCode = "";
    this.jsCode = "";
    this.resultCode = "";
  }

  /**
   * Concatenate html, css and js
   *
   * @param {string} type
   * @param {string} code
   * @return {string}
   */
  updateResultCode(type, code) {
    switch (type) {
      case "html":
        this.htmlCode = code;
        break;
      case "css":
        this.cssCode = code;
        break;
      case "js":
        this.jsCode = code;
        break;
    }
    this.resultCode = `${this.htmlCode}<style>${this.cssCode}</style><script>(function(){${this.jsCode}})()</script>`;
    return this.resultCode;
  }

  /**
   * Get room index with pin
   *
   * @param {string} id
   * @return {number}
   */
  static getRoomIndexWithPin(pinClient) {
    return Room.ROOMS.findIndex(({ pin }) => pin === pinClient);
  }

  /**
   * Get room index with admin id
   *
   * @param {string} id
   * @return {number}
   */
  static getRoomIndexWithAdmin(id) {
    return Room.ROOMS.findIndex(({ admin }) => admin === id);
  }

  /**
   * Check if room exists
   *
   * @param {string} pinClient
   * @return {boolean}
   */
  static checkRoom(pinClient) {
    let room = Room.ROOMS.find(({ pin }) => pin === pinClient);
    if(room){
      return { exist: true, type: room.type }
    }
    return { exist: false, type: false }
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
}

module.exports = Room;
