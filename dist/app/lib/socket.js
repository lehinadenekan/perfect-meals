"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
exports.getSocketIO = getSocketIO;
var socket_io_1 = require("socket.io");
var io = null;
function initializeSocket(httpServer) {
    if (!io) {
        io = new socket_io_1.Server(httpServer);
    }
    return io;
}
function getSocketIO() {
    if (!io) {
        throw new Error('Socket.IO has not been initialized');
    }
    return io;
}
