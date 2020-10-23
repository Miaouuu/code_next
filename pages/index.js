// pages/index.js

import { useState } from "react";
import io from "socket.io-client";
import Admin from "../components/Admin";
import Create from "../components/Create";
import Spectator from "../components/Spectator";

export default function Index() {
  const [type, setType] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [pin, setPin] = useState(null);
  const socket = io();

  const routing = () => {
    if (admin && pin) {
      return <Admin />;
    } else if (!admin && pin) {
      return <Spectator />;
    } else {
      return (
        <Create
          socket={socket}
          type={type}
          onSetAdmin={(admin) => setAdmin(admin)}
          onSetType={(type) => setType(type)}
          onSetPin={(pin) => setPin(pin)}
        />
      );
    }
  };

  return <div>{routing()}</div>;
}
