import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { SocketioContext } from "@/context/socketio.context";

const useSocketIo = () => {
  const { notification, setNotification } = useContext(SocketioContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const connect = io("http://localhost:8080");
    setSocket(connect);
  }, []);
  return { socket };
};

export default useSocketIo;
