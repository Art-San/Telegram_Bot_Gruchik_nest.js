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
  console.log(12, 'order', order?.potentialExecutors)

  if (!order) return <div className="">Загрузка</div>
  return (
    <div className="flex m-5 flex-col max-w-[350px] min-w-24">
      {order && (
        <div className="flex flex-col  gap-2">
          <div className="flex gap-2 items-end">
            <p className=" text-sm ">автор:</p>
            <h2 className="w-full text-xl">{order?.authorName}</h2>
          </div>
          <div className="flex gap-2 items-end">
            <p className=" text-sm ">время:</p>
            <h2 className="w-full text-xl">{order?.startTime}</h2>
          </div>
          <div className="flex gap-2 items-end">
            <p className=" text-sm ">адрес:</p>
            <h2 className="w-full text-xl">{order?.address}</h2>
          </div>
          <div className="">
            <p className=" text-sm ">детали:</p>
            <h2 className="w-full break-words">{order?.text}</h2>
          </div>
          <div className="flex gap-2 items-end">
            <p className=" text-sm ">кол-во: </p>
            <h2>{order?.numExecutors}</h2>
          </div>
          <div className="flex gap-2 items-end">
            <p className=" text-sm ">назначено: </p>
            <p className="w-full text-sm">{order?.potentialExecutors.length}</p>
          </div>
          <div className="flex">
            <p className=" text-sm m-auto">{order?.status}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails

//
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

// async findByOrderId(orderId: string) {
//     try {
//         const order = await this.db.order.findUnique({
//             where: { id: Number(orderId) },
//             include: {
//                 executors: {
//                     select: {
//                         user: {
//                             select: {
//                                 id: true,
//                                 telegramId: true,
//                                 userName: true, // Если вам нужно имя пользователя
//                             },
//                         },
//                     },
//                 },
//             },
//         });
//         if (!order) {
//             throw new NotFoundException(`Нет такого заказа №: ${orderId}`);
//         }
//         return order;
//     } catch (error) {
//         console.log('Ошибка в findByOrderId', error.message);
//         throw error.message;
//     }
// }
