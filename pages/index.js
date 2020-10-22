import io from "socket.io-client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const socket = io();
    socket.on("test");
  }, []);
  return (
    <div>
      <p>Oui</p>
    </div>
  );
}
