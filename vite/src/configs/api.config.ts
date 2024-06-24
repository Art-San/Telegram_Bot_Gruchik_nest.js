// Здесь будут содержаться почти все наши пути

// export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

// export const getGenresUrl = (string: string) => `/genres${string}`
// export const getActorsUrl = (string: string) => `/actors${string}`
// export const getRatingsUrl = (string: string) => `/ratings${string}`

export const VITE_URL_API = `${import.meta.env.VITE_API_URL}/api`

// Orders
export const getOrderUrl = (string: string) => `/orders${string}`
export const getOrderPagUrl = (string: string) => `/orders${string}`
export const getOrderUrlForMover = (string: string) => `/orders${string}`

// Users
export const getUsersUrl = (string: string) => `/users${string}`

// Auth
export const getAuthUrl = (string: string) => `/auth${string}`

// Admin
export const getOrderUrlForAdmin = (string: string) => `/admin/orders${string}`
export const getUserProfile = (string: string) =>
  `/admin/users/profile${string}`
export const getAuthAdminUrl = (string: string) => `/auth/admin${string}`
