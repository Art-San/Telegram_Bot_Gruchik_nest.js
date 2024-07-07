import { OrderService } from '@/services/order/order.service'
import { useOrderStore } from '@/zustand/useOrders/useOrderStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const baseKey = 'order'

export function useGetOrder(orderId: string) {
  const { order, setOrder } = useOrderStore()

  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: [baseKey, 'getOrderById', orderId],
    queryFn: () => OrderService.getByOrder(orderId),
    select: (data) => data.data,
    retry: 0,
    enabled: !!orderId
  })

  useEffect(() => {
    if (data) {
      setOrder(data)
    }
  }, [data, setOrder])

  return { order, isLoading, isError, isPending, error }
}
