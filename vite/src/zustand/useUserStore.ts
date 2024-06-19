import { create } from 'zustand'

interface User {
  telegramId: string
  userName: string
  userAvatar: string
  isAdmin: boolean
}

interface UserState {
  currentUser: User | null
  setCurrentUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user })
}))
