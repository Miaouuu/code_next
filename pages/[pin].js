// pages/index.[pin].js

import { useRouter } from "next/router";
import { useEffect } from "react";
import io from "socket.io-client";

export default function Pin() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.pin) {
      const socket = io();
      socket.on("RES_CHECK_ROOM", (exist) => {
        if (exist) {
          router.push({ pathname: "/", query: { pin: router.query.pin } });
        } else {
          router.push("/");
        }
      });
      console.log(router.query.pin);
      socket.emit("CHECK_ROOM", router.query.pin);
    }
  }, [router]);

  return <div></div>;
}
