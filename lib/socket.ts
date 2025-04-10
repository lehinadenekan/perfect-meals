import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: SocketIOServer | null = null;

export function initializeSocket(httpServer: HTTPServer) {
  if (!io) {
    io = new SocketIOServer(httpServer);
  }
  return io;
}

export function getSocketIO(): SocketIOServer {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
} 