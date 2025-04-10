"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var url_1 = require("url");
var next_1 = __importDefault(require("next"));
var socket_1 = require("./lib/socket");
var PORT = 3000; // Force port 3000
var dev = process.env.NODE_ENV !== 'production';
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, http_1.createServer)(function (req, res) {
        var parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    });
    // Initialize Socket.IO
    var io = (0, socket_1.initializeSocket)(server);
    // Socket.IO event handlers
    io.on('connection', function (socket) {
        console.log('Client connected');
        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    });
    server.listen(PORT, function () {
        console.log("> Ready on http://localhost:".concat(PORT));
    }).on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            console.error("Port ".concat(PORT, " is already in use. Please make sure no other service is running on port ").concat(PORT, "."));
            process.exit(1);
        }
        else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
});
