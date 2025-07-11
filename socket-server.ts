import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

interface ServerToClientEvents {
  welcome: (message: string) => void;
  message: (message: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}

const httpServer = new HttpServer();
const PORT = 3001;

const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin: "<http://localhost:3000>",
      methods: ["GET", "POST"]
    }
  }
);

io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  console.log('✅ New connection:', socket.id);

  socket.emit('welcome', `Your ID: ${socket.id}`);

  socket.on('message', (data: string) => {
    console.log('📩 Get:', data);
    socket.emit('message', `Server received "${data}"`);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnect:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
