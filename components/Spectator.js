// components/Spectator.js

import { useEffect, useState } from "react";

export default function Spectator({ socket, pin }) {
  const [result, setResult] = useState("");

  useEffect(() => {
    socket.on("RES_SEND_CODE", (code) => createPreview(code));
    socket.on("RES_GET_RESULT", (code) => createPreview(code));
    socket.emit("GET_RESULT", pin);
  }, []);

  const createPreview = (code) => {
    let preview = document.getElementById("preview");
    if (preview) {
      let content = preview.contentDocument || preview.contentWindow.document;
      content.open();
      content.write(code);
      content.close();
    }
  };

  return (
    <div>
      <iframe id="preview"></iframe>
    </div>
  );
}
