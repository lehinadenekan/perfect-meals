import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import path from 'path'; // <-- Import path again
import { Server as SocketIOServer, Socket } from 'socket.io'; // <-- Import Socket type

// Keep this import commented or removed if lib/socket has side effects
// import { initializeSocket } from './lib/socket';

const PORT = 3000; // Force port 3000
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Dynamically require initializeSocket using an absolute path
  // __dirname will be /Users/lehinadenekan/Desktop/SaaS/dist at runtime
  const socketLibPath = path.resolve(__dirname, './lib/socket');
  // eslint-disable-next-line
  const { initializeSocket } = require(socketLibPath);

  // Initialize Socket.IO
  // Assuming initializeSocket returns a SocketIOServer instance
  const io: SocketIOServer = initializeSocket(server);

  // Socket.IO event handlers
  io.on('connection', (socket: Socket) => { // <-- Use imported Socket type
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please make sure no other service is running on port ${PORT}.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}); 