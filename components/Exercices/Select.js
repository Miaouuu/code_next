// components/Exercices/Select.js

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import data from "../../data/starwars.json"

export default function Select({socket, pin}){
  const router = useRouter()
  const [order, setOrder] = useState([])

  useEffect(() => {
    socket.emit("SEND_RESOLUTION", {order, pin: router.query.pin})
  }, [order])

  const newOrder = (type) => {
    let exist = order.indexOf(type);
    if(exist === -1){
      setOrder(or => [...or, type]);
    } else {
      setOrder(order.filter(item => item !== type));
    }
  }

  return <>
    <div>
      {data.data.map((d, index) => {
        return (
          <div key={index}>
            <p onClick={() => newOrder(d.type)}>{order.indexOf(d.type) === -1 ? "X" : order.indexOf(d.type) + 1} : {d.value}</p>
          </div>
        )
      })}
    </div>
  </>
}