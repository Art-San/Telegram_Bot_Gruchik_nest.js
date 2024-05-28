import { OrderService } from '@/services/order.service'
import { IOrder } from '@/shared/types/order.types'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetails: FC = () => {
  const { orderId } = useParams()
  // const params = useParams()
  // const { userId, edit } = params

  const [order, setOrder] = useState<IOrder>()

  useEffect(() => {
    const fetchData = async () => {
      if (typeof orderId === 'string') {
        const { data } = await OrderService.getByOrder(orderId)
        setOrder(data)
      } else {
        console.error('Order ID is undefined')
        // Обработка случая, когда orderId undefined
      }
    }

    fetchData()
  }, [orderId]) // Добавьте orderId в массив зависимостей, если он используется внутри useEffect

  console.log(12, 'orderId', orderId)
  console.log(12, 'order', order?.potentialExecutors.length)
  return (
    <div className="flex flex-col mt-3">
      <div className="">
        <h2>{order?.authorName}</h2>
        <h2>{order?.startTime}</h2>
        <h2>{order?.address}</h2>
        <h2>{order?.text}</h2>
        <h2>{order?.hourCost}</h2>
        <div className="">
          <p>Кол-во грузчиков</p>
          <p>{order?.numExecutors}</p>
          {order?.potentialExecutors.length}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

// {
// 	"id": 4,
// 	"authorId": "721836748",
// 	"authorName": "@gruzz70tomsk",
// 	"startTime": "10:30",
// 	"typeWork": "rigging",
// 	"numExecutors": 3,
// 	"address": "Фрунзе",
// 	"text": "Рояль и сейф",
// 	"hourCost": 600,
// 	"hourCount": 1,
// 	"createdAt": "2024-05-26T11:48:53.117Z",
// 	"updatedAt": "2024-05-26T11:49:04.820Z",
// 	"potentialExecutors": [
// 		"6162144186"
// 	],
// 	"status": "created"
