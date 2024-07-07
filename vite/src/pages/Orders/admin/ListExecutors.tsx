import { useDelExecutorFromOrder } from '../hooks/useDelExecutorFromOrder'
import { UserX2 } from 'lucide-react'
import { Executor } from '@/types/orders/order_response.types'

const ListExecutors = ({
  executors,
  orderId
}: {
  executors: Executor[]
  orderId: number
}) => {
  const { deleteExecutorFromOrder } = useDelExecutorFromOrder()

  const handleDeleteExecutor = async (executorId: string, orderId: number) => {
    try {
      const response = deleteExecutorFromOrder({
        orderId: String(orderId),
        executorId
      })

      console.log(555, 'response', response)
    } catch (error) {
      console.error('Ошибка удаления исполнителя:', error)
    }
  }
  const executorsNum = executors.length === 0
  return (
    <div className="flex flex-col gap-1">
      <p className=" text-lg m-auto text-blue-400">Исполнители</p>
      {executorsNum ? (
        <p className=" text-red-400">Нет ни кого</p>
      ) : (
        executors.map((executor) => (
          <div
            key={executor.user.id}
            className="px-2 py-1  flex justify-between gap-3 items-baseline bg-slate-200  rounded-lg"
          >
            <div className="flex flex-col">
              <p className=" font-medium text-gray-500 text-xs">telegramId:</p>
              <p className=" text-green-600">{executor.user.telegramId}</p>
            </div>
            <div className="flex flex-col">
              <p className=" font-medium text-gray-500 text-xs">имя:</p>
              <p>{executor.user.userName}</p>
            </div>
            <div
              className=" cursor-pointer"
              onClick={() =>
                handleDeleteExecutor(executor.user.telegramId, orderId)
              }
            >
              <UserX2 size={17} className="text-red-600" />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ListExecutors
