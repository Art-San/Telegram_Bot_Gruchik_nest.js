// src/zustand/useUserProfileStore.ts
import { IUser } from '@/types/users.types'
import { create } from 'zustand'
// Предполагается, что интерфейс IUser определен здесь

interface UserProfileState {
  userProfile: IUser | null
  setUserProfile: (userProfile: IUser) => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile })
}))

// {
// 	"id": 12,
// 	"userId": 1,
// 	"telegramId": "721836748",
// 	"phone": "+79138183423",
// 	"fullName": "тар Мелкий",
// 	"userAvatar": "https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg",
// 	"role": "loader",
// 	"experience": "newbie",
// 	"rating": 5,
// 	"createdAt": "2024-06-25T11:35:00.642Z",
// 	"updatedAt": "2024-06-25T11:35:00.642Z"
// }
