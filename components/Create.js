// components/Create.js

import { useEffect } from "react";

export default function Create({ socket, type, onSetAdmin, onSetType, onSetPin }) {
  useEffect(() => {
    socket.on("RES_CREATE_ROOM", pin => onSetPin(pin));
  }, []);

  const createRoom = () => {
    socket.emit("CREATE_ROOM", type);
    onSetAdmin(true);
  };

  return (
    <>
      {/* <select defaultValue={type} onChange={({ target: { value } }) => onSetType(Number(value))}>
        <option value="0">Cours</option>
        <option value="1">Exercice</option>
      </select>
      <input type="button" value="Creer" onClick={createRoom} /> */}
      <div className="activity-selector">
        <div className="activity-selector--item" value="0" onClick={createRoom} alt="Créer un cours">
          Cours
        </div>
        <div className="activity-selector--item" value="1" onClick={createRoom} alt="Créer un exercice">
          Exercice
        </div>
      </div>
    </>
  );
}
