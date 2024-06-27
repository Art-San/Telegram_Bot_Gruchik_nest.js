import { IUser } from '@/types/users.types'
import { create } from 'zustand'

interface UserState {
  currentUser: IUser | null
  setCurrentUser: (user: IUser) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user })
}))
