import { create } from 'zustand'

interface IUser {
  id: number
  telegramId: string
  userName: string
  userAvatar: string
  isAdmin: boolean
}

interface UserState {
  currentUser: IUser | null
  setCurrentUser: (user: IUser) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user })
}))
