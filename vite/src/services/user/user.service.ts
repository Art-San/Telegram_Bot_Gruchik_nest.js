import { axiosClassic } from '@/api/interceptors'
import { getUserProfile, getUsersUrl } from '@/configs/api.config'
import { IDataFormUpdateProfile } from '@/types/profile.types'
import { IUser, IPaginationResult } from '@/types/users.types'

export const UserService = {
  async searchUsers1(searchTerm?: string) {
    return axiosClassic.get<IUser[]>(getUsersUrl(``), {
      params: searchTerm
        ? {
            searchTerm
          }
        : {}
    })
  },

  async searchUsers(
    page: string,
    pageSize: string,
    searchTerm?: string
  ): Promise<IPaginationResult<IUser>> {
    const response = await axiosClassic.get<IPaginationResult<IUser>>(
      getUsersUrl(``),
      {
        params: { page, pageSize, searchTerm }
      }
    )
    return response.data
  },

  async getCurrentUser(id: string) {
    const response = await axiosClassic.get<any>(getUsersUrl(`/${id}`))
    return response
  },

  async getProfile(userId: number) {
    return axiosClassic.get<any>(getUserProfile(String(userId)))
  }

  // async updateProfile(data: IProfileInput) {
  // 	return axios.put<string>(getUsersUrl('/profile'), data)
  // },

  // async getById(_id: string) {
  // 	return axios.get<IUser>(getUsersUrl(`/${_id}`))
  // },

  // async updateUser(_id: string, data: IProfileInput) {
  // 	return axios.put<string>(getUsersUrl(`/${_id}`), data)
  // },

  // async deleteUser(_id: string) {
  // 	return axios.delete<string>(getUsersUrl(`/${_id}`))
  // },

  // async getFavorites() {
  // 	return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
  // },

  // async toggleFavorite(movieId: string) {
  // 	return axios.put(getUsersUrl('/profile/favorites'), {
  // 		movieId,
  // 	})
  // },
}
