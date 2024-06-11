// Здесь будут содержаться почти все наши пути

// export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`
// export const getUsersUrl = (string: string) => `/users${string}`
// export const getGenresUrl = (string: string) => `/genres${string}`
// export const getActorsUrl = (string: string) => `/actors${string}`
// export const getRatingsUrl = (string: string) => `/ratings${string}`

export const VITE_URL_API = `${import.meta.env.VITE_API_URL}/api`

export const getOrderPagUrl = (string: string) => `/orders${string}`
export const getOrderUrl = (string: string) => `/orders${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
