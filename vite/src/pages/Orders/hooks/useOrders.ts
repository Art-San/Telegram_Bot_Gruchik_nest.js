import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { OrderService } from '@/services/order/order.service'
import { IOrder } from '@/shared/types/order.types'

export function useOrders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getAllOrders()
    // надо читать Rename cacheTime to gcTime
    // keepPreviousData: true, // Сохраняет предыдущие данные до обновления
    // staleTime: 10000, // Данные считаются устаревшими через 10 секунд
    // cacheTime: 60000, // Данные удаляются из кэша через 60 секунд
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)

  useEffect(() => {
    setOrders(data?.data)
  }, [data?.data])

  return { orders, isLoading, isError }
}

// --------- keepPreviousData
// Ошибка, которую вы видите, указывает на то, что свойство keepPreviousData
// не является допустимым свойством для объекта опций, передаваемого в useQuery.
// Это свойство было введено в более поздних версиях React Query и может потребовать обновления
// зависимостей или использования другой подход для достижения желаемого поведения.

// Если вы столкнулись с этой проблемой, возможно, вы используете старую версию React Query,
// которая не поддерживает свойство keepPreviousData. В таком случае, вам следует обновить
// React Query до последней версии, чтобы воспользоваться всеми доступными функциями и улучшениями.

// {
//   "dependencies": {
//     "@tanstack/react-query": "^latest_version"
//   }
// }
