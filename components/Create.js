// components/Create.js

import { useEffect } from "react";

export default function Create({ socket, onSetAdmin, onSetType, onSetPin }) {
  useEffect(() => {
    socket.on("RES_CREATE_ROOM", pin => onSetPin(pin));
  }, []);

  const createRoom = (type) => {
    onSetType(type)
    socket.emit("CREATE_ROOM", type);
    onSetAdmin(true);
  };

  return (
    <>
      <div className="activity-selector">
        <div className="activity-selector--item" value="0" onClick={() => createRoom(0)} alt="Créer un cours">
          Cours
        </div>
        <div className="activity-selector--item" value="1" onClick={() => createRoom(1)} alt="Créer un exercice">
          Exercice
        </div>
      </div>
    </>
  );
}
