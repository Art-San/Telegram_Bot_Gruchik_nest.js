import { IUser } from '@/types/users.types'
import { create } from 'zustand'

interface UserState {
  users: IUser[]
  totalPages: number
  setUsers: (users: IUser[]) => void
  setTotalPages: (totalPages: number) => void
}

export const useSearchUsersStore = create<UserState>((set) => ({
  users: [],
  totalPages: 0,
  setUsers: (users) => set({ users }),
  setTotalPages: (totalPages) => set({ totalPages })
}))
