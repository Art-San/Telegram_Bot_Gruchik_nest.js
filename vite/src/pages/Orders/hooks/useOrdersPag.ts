import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { OrderService } from '@/services/order/order.service'

import { useOrdersStore } from '@/zustand/useOrders/useOrdersStore'
import { IOrder, IPaginationResult } from '@/types/orders/order.types'

const isAuth = true

export function useOrdersPag(page: string, pageSize: string, days?: string) {
  const { setOrders, setTotalPages } = useOrdersStore()

  const { data, isLoading, isError } = useQuery<IPaginationResult<IOrder>>({
    queryKey: ['orders', page, pageSize, days],
    queryFn: () => OrderService.getOrdersPag(page, pageSize, days),
    enabled: isAuth
  })

  useEffect(() => {
    if (data) {
      setOrders(data?.data)
      setTotalPages(data?.totalPages)
    }
  }, [data, setOrders, setTotalPages])

  return { isLoading, isError, total: data?.totalPages || 0 }
}

// import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
// import { OrderService } from '@/services/order/order.service'
// import { IOrder, IPaginationResult } from '@/shared/types/order.types'

// const isAuth = true

// export function useOrdersPag(page: string, pageSize: string, days?: string) {
//   const { data, isLoading, isError } = useQuery<IPaginationResult<IOrder>>({
//     queryKey: ['orders', page, pageSize, days],
//     queryFn: () => OrderService.getOrdersPag(page, pageSize, days),
//     enabled: isAuth
//   })

//   const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)
//   const [totalPages, setTotalPages] = useState<number>(data?.totalPages || 0)

//   useEffect(() => {
//     setOrders(data?.data)
//     setTotalPages(data?.totalPages || 0)
//   }, [data])

//   return { orders, isLoading, isError, total: totalPages }
// }
