import { IOrderResponseP } from '@/types/orders/order_response.types'
import { create } from 'zustand'

interface UserOrderState {
  order: IOrderResponseP | null
  setOrder: (order: IOrderResponseP) => void
}

export const useOrderStore = create<UserOrderState>((set) => ({
  order: null,
  setOrder: (order) => set({ order })
}))
