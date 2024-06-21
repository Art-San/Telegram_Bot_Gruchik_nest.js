import { OrderService } from '@/services/order/order.service'
import { IOrder } from '@/shared/types/order.types'
import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBigLeft, Trash, UserX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDelExecutorFromOrder } from '../hooks/useDelExecutorFromOrder'
import { Spinner } from '@/components/ui/spinner'

const OrderDetailsAdmin: FC = () => {
  const { orderId } = useParams()
  const { deleteExecutorFromOrder } = useDelExecutorFromOrder()
  const navigate = useNavigate()

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

  const handleDeleteExecutor = async (executorId: string, orderId: number) => {
    console.log(123, 'deleteExecutorFromOrder')
    try {
      const response = deleteExecutorFromOrder({
        orderId: String(orderId),
        executorId
      })
      if (response.ok) {
        // Обновление состояния, например, перезагрузка списка исполнителей
        // или удаление конкретного исполнителя из UI
        console.log('Исполнитель успешно удален')
      } else {
        console.error('Не удалось удалить исполнителя.')
      }
    } catch (error) {
      console.error('Ошибка удаления исполнителя:', error)
    }
  }

  const executorsNum = order?.executors.length === 0

  // Функция для возврата на предыдущую страницу
  const goBack = () => {
    navigate(-1)
  }

  if (!order)
    return (
      <div className=" flex items-center justify-center h-screen w-screen">
        <Spinner
          className="mr-2 h-6 w-6 animate-spin"
          aria-label="Обновление профиля"
        />
      </div>
    )

  return (
    <div className=" mt-2 flex flex-col items-center justify-center ">
      <div className=" flex  w-1/3 justify-between">
        <Button variant={'ghost'} onClick={goBack}>
          {/* <Button onClick={() => navigate(-1)}> */}
          <ArrowBigLeft /> <p>назад</p>
        </Button>
        <Button variant={'outline'} onClick={goBack}>
          <p>Удалить</p> <Trash size={15} />
        </Button>
      </div>

      <div className="flex px-2 flex-col max-w-[350px] min-w-24">
        {order && (
          <div className="flex flex-col  gap-2">
            <div className=" flex gap-4">
              <div className="flex flex-col">
                <p className=" text-sm ">время:</p>
                <h2 className="w-full text-lg">{order?.startTime}</h2>
              </div>
              <div className="flex flex-col items-baseline">
                <p className=" text-sm ">адрес:</p>
                <h2 className="w-full text-lg">{order?.address}</h2>
              </div>
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
              <p className=" text-sm ">автор:</p>
              <h2 className="w-full text-lg">{order?.authorName}</h2>
            </div>
            <div className="flex flex-col">
              <p className=" text-lg m-auto text-blue-400">Исполнители</p>
              {executorsNum ? (
                <p className=" text-red-400">Нет ни кого</p>
              ) : (
                order?.executors.map((executor) => (
                  <div
                    key={executor.user.id}
                    className="px-2 py-1  flex gap-3 items-baseline bg-slate-200  rounded-lg"
                  >
                    <div className="flex flex-col">
                      <p className=" font-medium text-gray-500 text-xs">
                        telegramId:
                      </p>
                      <p>{executor.user.telegramId}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className=" font-medium text-gray-500 text-xs">имя:</p>
                      <p>{executor.user.userName}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 items-baseline">
              <p className=" text-sm ">запросов: </p>
              <p className="w-full text-sm">
                {order?.potentialExecutors.length}
              </p>
            </div>
            <div className="flex">
              <p className=" text-sm m-auto">{order?.status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetailsAdmin
