import { create } from 'zustand'
import { IOrder } from '@/shared/types/order.types'

interface OrderState {
  orders: IOrder[]
  totalPages: number
  setOrders: (orders: IOrder[]) => void
  setTotalPages: (totalPages: number) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  totalPages: 0,
  setOrders: (orders) => set({ orders }),
  setTotalPages: (totalPages) => set({ totalPages })
}))
