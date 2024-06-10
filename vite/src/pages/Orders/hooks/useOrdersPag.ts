import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { OrderService } from '@/services/order/order.service'
import { IOrder, IPaginationResult } from '@/shared/types/order.types'

const isAuth = true

export function useOrdersPag(page: string, pageSize: string) {
  const { data, isLoading, isError } = useQuery<IPaginationResult<IOrder>>({
    queryKey: ['orders', page, pageSize],
    queryFn: () => OrderService.getOrdersPag(page, pageSize),
    enabled: isAuth
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)
  const [totalPages, setTotalPages] = useState<number>(data?.totalPages || 0)

  useEffect(() => {
    setOrders(data?.data)
    setTotalPages(data?.totalPages || 0)
  }, [data])

  return { orders, isLoading, isError, total: totalPages }
}

// import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'

// import { OrderService } from '@/services/order/order.service'
// import { IOrder } from '@/shared/types/order.types'

// const isAuth = true

// export function useOrdersPag(page: string, pageSize: string) {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['orders'],
//     queryFn: () => OrderService.getOrdersPag(page, pageSize),
//     select: (data) => data.data,
//     enabled: isAuth
//   })

//   const [orders, setOrders] = useState<IOrder[] | undefined>(data)

//   useEffect(() => {
//     setOrders(data)
//   }, [data])

//   return { orders, isLoading, isError }
// }
