import { useEffect, useState } from 'react'
import { OrderService } from '../../services/order.service'
// import axios from 'axios'

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
  // const [orders2, setOrders2] = useState<IOrder[]>([])
  // const [review, setReview] = useState<any>([])
  // const [place, setPlace] = useState<any>([])
  // const [data, setData] = useState<IOrder[]>([])
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/review')
  //     .then((response) => response.json())
  //     .then((json) => setReview(json))
  // }, [])

  // useEffect(() => {
  //   fetch('https://b8bf-176-213-208-91.ngrok-free.app/api/orders', {
  //     method: 'get',
  //     headers: new Headers({
  //       'ngrok-skip-browser-warning': '69420'
  //     })
  //   })
  //     .then((response) => {
  //       // Проверяем, что ответ успешен (статус 200-299)
  //       if (!response.ok) {
  //         throw new Error(`HTTP error status: ${response.status}`)
  //       }

  //       // Пытаемся разобрать ответ как JSON
  //       return response.json()
  //     })
  //     .then((json) => {
  //       setOrders2(json)
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem with the fetch operation:', error)
  //     })
  // }, [])

  // useEffect(() => {
  //   axios
  //     .get('https://b8bf-176-213-208-91.ngrok-free.app/api/orders', {
  //       headers: {
  //         'ngrok-skip-browser-warning': '69420'
  //       }
  //     })
  //     .then((response) => {
  //       // Обрабатываем ответ
  //       setOrders2(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Ошибка при получении заказов:', error)
  //     })
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAll()
      setOrders(data) // Предполагается, что сервер возвращает строку 'hello world'
      console.log(13, data)
    }
    fetchData()
  }, [])
  // ypeError: Oops, we haven't got JSON!
  // console.log(11, 'orders', orders2)
  // console.log(12, 'review', review)
  // console.log(13, 'place', place)
  return (
    <div className="flex flex-col gap-3">
      {/* {orders2.map((order, index) => (
        <div className="" key={index}>
          <h2 className=" text-xl font-semibold">{order.typeWork}</h2>
          <div className=" text-red-700">{order.authorName}</div>
          <div className=" text-red-700">{order.status}</div>
        </div>
      ))} */}

      <div className="">
        <h2 className=" text-xl font-semibold">
          http://localhost:3001/api/orders
        </h2>
        <div className=" text-green-700">{orders[0]?.authorName}</div>
        <div className=" text-green-700">{orders[0]?.status}</div>
      </div>
      <div className="">
        {/* <h2 className=" text-xl font-semibold">localhost:3000</h2>
        <div className=" text-blue-600">{review[1]?.name}</div>
        <div className=" text-blue-600">{review[1]?.description}</div> */}
      </div>
      <div className="">
        {/* <h2 className=" text-xl font-semibold">jsonplaceholder</h2>
        <div className=" text-green-700">{place.title}</div> */}
      </div>
    </div>
  )
}

export default OrdersCards
