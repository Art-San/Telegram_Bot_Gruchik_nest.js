import axios from 'axios'

// import { removeTokensStorage } from '@/services/auth/auth.helper'
// import { AuthService } from '@/services/auth/auth.service'

// import { API_SERVER_URL, API_URL } from '@/configs/api.config'
// import { IS_PRODUCTION } from '@/configs/constants'
import { getContentType } from './api.helpers'
import { VITE_URL_API } from '@/configs/api.config'

// const api = '/api'
export const axiosClassic = axios.create({
  baseURL: VITE_URL_API,
  // baseURL: import.meta.env.VITE_API_URL + api,
  // timeout: 15_000, //  Это означает, что если сервер не ответит в течение 15 секунд, запрос будет прерван, и axios сгенерирует ошибку таймаута
  headers: getContentType(),
  withCredentials: true // Запросы без учетных данных (если true на backend должно app.enableCors({origin: 'http://localhost:5173', credentials: true,}))
})

// Interceptor позволит скрытно от пользователя обновить токен, когда у того истечет срок

// const instance = axios.create({
// 	baseURL: API_URL,
// 	headers: getContentType(),
// })

// instance.interceptors.request.use((config) => {
// 	const accessToken = Cookies.get('accessToken')
// 	if (config.headers && accessToken)
// 		config.headers.Authorization = `Bearer ${accessToken}`

// 	return config
// })

// instance.interceptors.response.use(
// 	(config) => config,
// 	async (error) => {
// 		const originalRequest = error.config

// 		if (
// 			(error.response.status === 401 ||
// 				errorCatch(error) === 'jwt expired' ||
// 				errorCatch(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				await AuthService.getNewTokens()

// 				return instance.request(originalRequest)
// 			} catch (e) {
// 				if (errorCatch(e) === 'jwt expired') removeTokensStorage()
// 			}
// 		}

// 		throw error
// 	}
// )

// export default instance

// Interceptor позволит скрытно от пользователя обновить токен, когда у того истечет срок
