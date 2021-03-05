// components/Exercices/Visual.js

import Qrcode from "qrcode.react";
import Iphone from "../Renders/Iphone"
import data from "../../data/starwars.json"
import { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

export default function Visual({socket, pin}){
  const [valid, setValid] = useState(false)
  const [ord, setOrd] = useState([])

  useEffect(() => {
    socket.on("RES_SEND_RESOLUTION", code => {
      writeCode(code)
      checkValid(code)
    });
    writeCode()
  }, []);

  const writeCode = (order) => {
    let preview = document.getElementById("preview");
    if (preview) {
      let turn = [];
      if(order){
        turn = order.map((or) => {
          let text = data.data.find(d => d.type === or);
          return text.value;
        })
      }
      setOrd(turn)
      let code = "";
      data.code.forEach((t, index) => {
        code+=t;
        if(index !== data.code.length){
          code+=turn[index]
        }
      })
      let content = preview.contentDocument || preview.contentWindow.document;
      content.open();
      content.write(code);
      content.close();
      
    }
  }

  const checkValid = (order) => {
    if(JSON.stringify(order) === JSON.stringify(data.order)){
      setValid(true)
    }
  }

  return <>
    <div>
      <Qrcode value={window.location.href + pin}/>
      {valid ? <p>C'est bon</p> : null}
      <CodeMirror
              value={`<body>
              <div class="starwars-demo">
                <img src="${ord[0] ? ord[0] : "???"}" alt="Star" class="${ord[1] ? ord[1] : "???"}" />
                <img src="${ord[2] ? ord[2] : "???"}" alt="Wars" class="${ord[3] ? ord[3] : "???"}" />
                <h2 class="byline" id="byline">The Force Awakens</h2>
              </div>
              <script>
                  let byline = document.getElementById("byline");
            
                  bylineText = ${ord[4] ? ord[4] : "???"};
                  bylineArr = bylineText.split("");
                  byline.innerHTML = "";
            
                  let span;
                  let letter;
            
                  for (${ord[5] ? ord[5] : "???"}) {
                    span = document.createElement("span");
                    letter = document.createTextNode(bylineArr[i]);
                    if (${ord[6] ? ord[6] : "???"}) {
                      byline.appendChild(letter);
                    } else {
                      span.appendChild(letter);
                      byline.appendChild(span);
                    }
                  }
              </${ord[7] ? ord[7] : "???"}>
              <style>
                .star {
                  animation: star 10s ease-out infinite;
                }
                .wars {
                  animation: wars 10s ease-out infinite;
                }
                .byline span {
                  animation: spin-letters 10s linear infinite;
                }
                .byline {
                  animation: move-byline 10s linear infinite;
                }
            
                @keyframes star {
                  0% {
                    opacity: 0;
                    transform: scale(1.5) translateY(-0.75em);
                  }
                  20% {
                    opacity: 1;
                  }
                  89% {
                    opacity: 1;
                    transform: scale(1);
                  }
                  100% {
                    opacity: 0;
                    transform: translateZ(-1000em);
                  }
                }
            
                @keyframes wars {
                  0% {
                    opacity: 0;
                    transform: scale(1.5) translateY(0.5em);
                  }
                  20% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 1;
                    transform: scale(1);
                  }
                  100% {
                    opacity: 0;
                    transform: translateZ(-1000em);
                  }
                }
            
                @keyframes spin-letters {
                  0%,
                  10% {
                    opacity: 0;
                    transform: rotateY(90deg);
                  }
                  30% {
                    opacity: 1;
                  }
                  70%,
                  86% {
                    transform: rotateY(0);
                    opacity: 1;
                  }
                  95%,
                  100% {
                    opacity: 0;
                  }
                }
            
                @keyframes move-byline {
                  0% {
                    transform: translateZ(5em);
                  }
                  100% {
                    transform: translateZ(0);
                  }
                }
            
                .starwars-demo {
                  perspective: 800px;
                  transform-style: preserve3d;
                }
            
                body {
                  background: #000
                    url(https://cssanimation.rocks/demo/starwars/images/bg.jpg);
                }
            
                .starwars-demo {
                  height: 17em;
                  left: 50%;
                  position: absolute;
                  top: 53%;
                  transform: translate(-50%, -50%);
                  width: 34em;
                }
            
                .byline span {
                  display: inline-block;
                }
            
                img {
                  width: 100%;
                }
            
                .star,
                .wars,
                .byline {
                  position: absolute;
                }
            
                .star {
                  top: -0.75em;
                }
            
                .wars {
                  bottom: -0.5em;
                }
            
                .byline {
                  color: #fff;
                  font-family: "ITC Serif Gothic", Lato;
                  font-size: 2.25em;
                  left: -2em;
                  letter-spacing: 0.4em;
                  right: -2em;
                  text-align: center;
                  text-transform: uppercase;
                  top: 29%;
                }
            
                @media only screen and (max-width: 600px) {
                  .starwars-demo {
                    font-size: 10px;
                  }
                }
            
                @media only screen and (max-width: 480px) {
                  .starwars-demo {
                    font-size: 7px;
                  }
                }
              </style>
            </body>`}
              options={{
                mode: "htmlmixed",
                theme: "monokai",
                lineNumbers: true
              }}
            />
      <Iphone />
    </div>
  </>
}