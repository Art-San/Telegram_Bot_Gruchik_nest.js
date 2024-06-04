import { axiosClassic } from '@/api/interceptors'
import { IAuthForm } from './../../types/auth.types'
// import { getContentType } from 'api/api.helpers'

// import Cookies from 'js-cookie'

// import { API_URL, getAuthUrl } from '@/configs/api.config'

// import { IAuthResponse } from '@/store/user/user.interface'

// import { removeTokensStorage, saveToStorage } from './auth.helper'
import { getAuthUrl } from '@/configs/api.config'
import { IUser } from '@/types/user.types'

export const AuthService = {
  async login(data: IAuthForm) {
    const response = await axiosClassic.post<IUser>(getAuthUrl('/login'), data)

    console.log(12, response)
    // if (response.data.accessToken) {
    //   saveToStorage(response.data)
    // }

    return response
  }

  // logout() {
  //   removeTokensStorage()
  //   localStorage.removeItem('user')
  // },

  // async register(userName: string, password: string) {
  // 	const response = await axiosClassic.post<IAuthResponse>(
  // 		`${API_URL}${getAuthUrl('/register')}`,
  // 		{
  // 			userName,
  // 			password,
  // 		}
  // 	)

  // 	if (response.data.accessToken) {
  // 		saveToStorage(response.data)
  // 	}

  // 	return response
  // },

  // async getNewTokens() {
  // 	const refreshToken = Cookies.get('refreshToken')
  // 	const response = await axiosClassic.post<IAuthResponse>(
  // 		`${API_URL}${getAuthUrl('/login/access-token')}`,
  // 		{
  // 			refreshToken,
  // 		},
  // 		{
  // 			headers: getContentType(),
  // 		}
  // 	)

  // 	if (response.data.accessToken) {
  // 		saveToStorage(response.data)
  // 	}

  // 	return response
  // },
}
