import { IOrder } from '@/types/orders/order.types'
import { create } from 'zustand'

interface OrdersState {
  orders: IOrder[]
  totalPages: number
  setOrders: (orders: IOrder[]) => void
  setTotalPages: (totalPages: number) => void
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  totalPages: 0,
  setOrders: (orders) => set({ orders }),
  setTotalPages: (totalPages) => set({ totalPages })
}))
