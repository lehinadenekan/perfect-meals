import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { initializeSocket } from './app/lib/socket';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.IO
  const io = initializeSocket(server);

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
}); 