import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { SocketioContext } from "@/context/socketio.context";

const useSocketIo = () => {
  const { notification, setNotification } = useContext(SocketioContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
      const connect = io.connect("http://localhost:8080");
      setSocket(connect);
  }, []);
  return socket;
};

export function sendNotification() {
  const { notification, setNotification } = useContext(SocketioContext);
  const { connect } = useSocketIo();
  // Send the message to the server
  connect.emit("notification", notification);
  console.log(`Sent notification: ${notification}`);
  // Clear the currentMessage state
  setNotification([]);
}

export default useSocketIo;
