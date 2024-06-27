import { IProfileResponse, IDataFormCreateProfile } from '@/types/profile.types'
import { axiosClassic } from '../../api/interceptors'
import { getUserProfile } from '@/configs/api.config'

export const ProfileService = {
  async getProfile(userId: number) {
    return axiosClassic.get<IProfileResponse>(getUserProfile(String(userId)))
  },
  async updateProfile(userId: number, data: IDataFormCreateProfile) {
    return axiosClassic.put<IProfileResponse>(
      getUserProfile(String(userId)),
      data
    )
  }
}

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
