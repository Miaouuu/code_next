// components/Create.js

import { useEffect } from "react";

export default function Create({
  socket,
  type,
  onSetAdmin,
  onSetType,
  onSetPin,
}) {
  useEffect(() => {
    socket.on("RES_CREATE_ROOM", (pin) => onSetPin(pin));
  }, []);

  const createRoom = () => {
    socket.emit("CREATE_ROOM", type);
    onSetAdmin(true);
  };

  return (
    <div>
      <select
        defaultValue={type}
        onChange={({ target: { value } }) => onSetType(Number(value))}
      >
        <option value="0">Cours</option>
        <option value="1">Exercice</option>
      </select>
      <input type="button" value="Creer" onClick={createRoom} />
    </div>
  );
}
