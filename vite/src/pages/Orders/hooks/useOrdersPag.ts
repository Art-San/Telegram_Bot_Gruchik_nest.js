import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { OrderService } from '@/services/order/order.service'
import { IOrder } from '@/shared/types/order.types'

const isAuth = true

export function useOrdersPag(page: string, pageSize: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getOrdersPag(page, pageSize),
    select: (data) => data.data,
    enabled: isAuth
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data)

  useEffect(() => {
    setOrders(data)
  }, [data])

  return { orders, isLoading, isError }
}
