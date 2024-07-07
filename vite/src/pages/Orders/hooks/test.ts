// // useDelExecutorFromOrder.ts
// import { OrderService } from '@/services/order/order.service'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// export function useDelExecutorFromOrder() {
//   const queryClient = useQueryClient()

//   const {
//     mutate: deleteExecutorFromOrder,
//     isPending: isDeletePending,
//     isError
//   } = useMutation({
//     mutationKey: ['delete executor order'],
//     mutationFn: ({
//       orderId,
//       executorId
//     }: {
//       orderId: string
//       executorId: string
//     }) => OrderService.deleteExecutorFromOrder(orderId, executorId),
//     onSuccess: () => {
//       // Invalidate multiple queries that might be affected
//       queryClient.invalidateQueries({ queryKey: ['orders'] })
//       queryClient.invalidateQueries({ queryKey: ['order', orderId] })
//       queryClient.invalidateQueries({ queryKey: ['executors', executorId] })
//       // Add any additional keys here if needed
//     }
//   })

//   return { deleteExecutorFromOrder, isDeletePending, isError }
// }

// // useGetOrders.ts
// import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
// import { OrderService } from '@/services/order/order.service'
// import { IOrder } from '@/types/orders/order.types'

// const isAuth = true
// const baseKey = 'orders'

// export function useGetOrders() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: [baseKey],
//     queryFn: () => OrderService.getAllOrders(),
//     select: (data) => data.data,
//     enabled: isAuth
//   })

//   const [orders, setOrders] = useState<IOrder[] | undefined>(data)

//   useEffect(() => {
//     setOrders(data)
//   }, [data])

//   return { orders, isLoading, isError }
// }

// // useGetOrder.ts
// import { OrderService } from '@/services/order/order.service'
// import { useOrderStore } from '@/zustand/useOrders/useOrderStore'
// import { useQuery } from '@tanstack/react-query'
// import { useEffect } from 'react'

// const baseKey = 'order'

// export function useGetOrder(orderId: string) {
//   const { order, setOrder } = useOrderStore()

//   const { data, isLoading, isPending, isError } = useQuery({
//     queryKey: [baseKey, 'getOrderById', orderId],
//     queryFn: () => OrderService.getByOrder(orderId),
//     select: (data) => data.data,
//     retry: 0,
//     enabled: !!orderId
//   })

//   useEffect(() => {
//     if (data) {
//       setOrder(data)
//     }
//   }, [data, setOrder])

//   return { order, isLoading, isError, isPending }
// }
