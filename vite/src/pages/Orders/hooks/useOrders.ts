import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { OrderService } from '@/services/order.service'
import { IOrder } from '@/shared/types/order.types'

export function useOrders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getAllOrders()
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)

  useEffect(() => {
    setOrders(data?.data)
  }, [data?.data])

  return { orders, isLoading, isError }
}
