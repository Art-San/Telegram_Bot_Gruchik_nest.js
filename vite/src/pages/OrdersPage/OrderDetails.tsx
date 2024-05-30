import { OrderService } from '@/services/order.service'
import { IOrder } from '@/shared/types/order.types'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserX } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OrderDetails: FC = () => {
  const { orderId } = useParams()

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

  // console.log(12, 'orderId', orderId)
  // console.log(12, 'order', order?.executors)

  const handleDeleteExecutor = async (executorId: string, orderId: number) => {
    console.log(12, 'executorId', executorId)
    console.log(12, 'orderId', orderId)
    try {
      const response = await fetch(
        `http://localhost:3001/api/orders/${orderId}/remove-executor/${executorId}`,
        {
          method: 'POST'
        }
      )
      if (response.ok) {
        // Обновление состояния, например, перезагрузка списка исполнителей
        // или удаление конкретного исполнителя из UI
        console.log('Executor removed successfully')
      } else {
        console.error('Failed to remove executor')
      }
    } catch (error) {
      console.error('Error removing executor:', error)
    }
  }

  if (!order) return <div className="">Загрузка</div>
  return (
    <div className="flex m-5 flex-col max-w-[350px] min-w-24">
      {order && (
        <div className="flex flex-col  gap-2">
          <div className="flex gap-2 items-baseline">
            <p className=" text-sm ">автор:</p>
            <h2 className="w-full text-lg">{order?.authorName}</h2>
          </div>
          <div className="flex gap-2  items-baseline">
            <p className=" text-sm ">время:</p>
            <h2 className="w-full text-lg">{order?.startTime}</h2>
          </div>
          <div className="flex gap-2 items-baseline">
            <p className=" text-sm ">адрес:</p>
            <h2 className="w-full text-lg">{order?.address}</h2>
          </div>
          <div className="flex gap-2 items-baseline">
            <p className=" text-sm ">грузчик: </p>
            <h2>{order?.numExecutors}</h2>
          </div>
          <div className="">
            <p className=" text-sm ">детали:</p>
            <h2 className="w-full break-words">{order?.text}</h2>
          </div>
          <div className="flex flex-col">
            <p className=" text-lg m-auto ">Исполнители</p>
            {order?.executors.map((executor) => (
              <div key={executor.user.id} className="flex gap-2 items-baseline">
                <p>T-id: {executor.user.telegramId}</p>
                <p>{executor.user.userName}</p>
                <Button
                  variant="custom"
                  size={'icon'}
                  onClick={() =>
                    handleDeleteExecutor(executor.user.telegramId, order.id)
                  }
                >
                  <UserX size={'17'} />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-baseline">
            <p className=" text-sm ">запросов: </p>
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
