import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }

const useSocketIo = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const connect: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080');
    setSocket(connect);
  }, []);
  return { socket };
};

export default useSocketIo;