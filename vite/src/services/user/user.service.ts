import { axiosClassic } from '@/api/interceptors'
import { getUsersUrl } from '@/configs/api.config'
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
  }

  // async getProfile() {
  // 	return axios.get<IUser>(getUsersUrl('/profile'))
  // },

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
