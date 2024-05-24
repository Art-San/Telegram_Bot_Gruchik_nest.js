import { useEffect, useState } from 'react'
// import { OrderService } from '../../services/order.service'

interface IOrder {
  id: number
  authorId: string
  authorName: string
  startTime: string
  typeWork: string
  numExecutors: number
  address: string
  text: string
  hourCost: number
  potentialExecutors: string[]
  hourCount: number
  status: string
}

const OrdersCards = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  // const [data, setData] = useState<IOrder[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/api/orders')
      .then((response) => response.json())
      .then((json) => setOrders(json))
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await OrderService.getAll()
  //     setOrders(data) // Предполагается, что сервер возвращает строку 'hello world'
  //   }

  //   fetchData()
  // }, [])

  console.log(11, orders[0]?.authorName)
  return (
    <div className="">
      <div className=" text-red-700">{orders[0]?.authorName}</div>
      <div className=" text-red-700">{orders[0]?.status}</div>
    </div>
  )
}

export default OrdersCards
