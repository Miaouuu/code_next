// router/index.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Admin from "../components/Cours/Admin";
import Create from "../components/Create";
import Spectator from "../components/Cours/Spectator";
import Visual from "../components/Exercices/Visual"
import Select from "../components/Exercices/Select"

const socket = io();

export default function Index() {
  const router = useRouter();
  const [type, setType] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    if (router.query.pin) {
      socket.on("RES_JOIN_ROOM", ({valid, type}) => {
        if (valid) {
          setPin(router.query.pin);
          setType(type);
        }
      });
      socket.emit("JOIN_ROOM", router.query.pin);
    }
  }, [router]);

  const routing = () => {
    if (admin && pin && type === 0) {
      return <Admin socket={socket} pin={pin} />;
    } else if (!admin && pin && type === 0) {
      return <Spectator socket={socket} pin={pin} />;
    } else if (admin && pin && type === 1){
      return <Visual socket={socket} pin={pin} />
    } else if (!admin && pin && type === 1){
      return <Select socket={socket} pin={pin} />
    } else {
      return <Create socket={socket} onSetAdmin={admin => setAdmin(admin)} onSetType={type => setType(type)} onSetPin={pin => setPin(pin)} />;
    }
  };

  return <>{routing()}</>;
}
