// components/Erxercices/Admin.js

import { useEffect, useState } from "react";
import Qrcode from "qrcode.react";
import Iphone from "../Renders/Iphone";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/htmlmixed/htmlmixed");
  require("codemirror/mode/css/css");
}

export default function Admin({ socket, pin }) {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  useEffect(() => {
    socket.on("RES_SEND_CODE", code => {
      let preview = document.getElementById("preview");
      if (preview) {
        let content = preview.contentDocument || preview.contentWindow.document;
        content.open();
        content.write(code);
        content.close();
      }
    });
  }, []);

  const sendCode = (type, code) => {
    switch (type) {
      case "html":
        setHtmlCode(code);
        break;
      case "css":
        setCssCode(code);
        break;
      case "js":
        setJsCode(code);
        break;
    }
    socket.emit("SEND_CODE", { type, code });
  };

  return (
    <>
      <div className="main-admin">
        <div className="main-content">
          <Qrcode value={window.location.href + pin} />
          <div className="flex-items">
            <CodeMirror
              value={htmlCode}
              options={{
                mode: "htmlmixed",
                theme: "monokai",
                lineNumbers: true
              }}
              onBeforeChange={(editor, data, value) => sendCode("html", value)}
            />
            <CodeMirror
              value={cssCode}
              options={{
                mode: "css",
                theme: "monokai",
                lineNumbers: true
              }}
              onBeforeChange={(editor, data, value) => sendCode("css", value)}
            />
            <CodeMirror
              value={jsCode}
              options={{
                mode: "javascript",
                theme: "monokai",
                lineNumbers: true
              }}
              onBeforeChange={(editor, data, value) => sendCode("js", value)}
            />
          </div>
        </div>
        <Iphone />
      </div>
    </>
  );
}
