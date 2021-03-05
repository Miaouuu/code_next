// pages/index.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Admin from "../components/Cours/Admin";
import Create from "../components/Create";
import Spectator from "../components/Cours/Spectator";

const socket = io();

export default function Index() {
  const router = useRouter();
  const [type, setType] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    if (router.query.pin) {
      socket.on("RES_JOIN_ROOM", valid => {
        if (valid) {
          setPin(router.query.pin);
        }
      });
      socket.emit("JOIN_ROOM", router.query.pin);
    }
  }, [router]);

  const routing = () => {
    if (admin && pin) {
      return <Admin socket={socket} pin={pin} />;
    } else if (!admin && pin) {
      return <Spectator socket={socket} pin={pin} />;
    } else {
      return <Create socket={socket} type={type} onSetAdmin={admin => setAdmin(admin)} onSetType={type => setType(type)} onSetPin={pin => setPin(pin)} />;
    }
  };

  return <>{routing()}</>;
}
