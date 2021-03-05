// components/Exercices/Select.js

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import data from "../../data/starwars.json"

export default function Select({socket, pin}){
  const router = useRouter()
  const [order, setOrder] = useState([])
  const [no, setNo] = useState([])

  useEffect(() => {
    socket.on("RES_SEND_RESOLUTION", order => {
      setNo(order)
    })
  }, [])

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
            <p onClick={() => newOrder(d.type)}>{no.indexOf(d.type) === -1 ? "X" : no.indexOf(d.type) + 1} : {d.value}</p>
          </div>
        )
      })}
    </div>
  </>
}