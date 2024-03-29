import { io } from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketioContext } from "@/context/socketio.context";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "./shared";

const useSocketIo = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const { socket, setSocket } = useContext(SocketioContext);
  const socketTemp = useRef(null);
  useEffect(() => {
    const connect = io(baseUrl);
    socketTemp.current = connect;
    setSocket(connect);
  }, []);
  useEffect(() => {
    socketTemp.current.emit("addUser", { clients });
  }, [socket, clients]);
  return { socket };
};

export default useSocketIo;
