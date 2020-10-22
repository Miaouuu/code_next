import io from "socket.io-client";
import { useEffect } from "react";

import Layout from "../components/Layout";

const Index = <Layout />;

export default function Home() {
  useEffect(() => {
    const socket = io();
    socket.on("test");
  }, []);
  return Index;
}
