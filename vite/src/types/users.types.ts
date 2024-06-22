export interface IUser {
  id: number
  telegramId: string
  userName: string
  userAvatar?: string
  isActive: boolean
  isBlocked: boolean
  isAdmin: boolean
  profile?: IProfile
  profileFilled: boolean
  createdAt: string
  updatedAt: string
}

export interface IProfile {
  id: number
  userId: number
  telegramId?: string
  phone?: string
  fullName?: string
  userAvatar?: string
  role: string
  rating: number
  createdAt: string
  updatedAt: string
}

export interface IPaginationResult<T> {
  data: T[]
  totalPages: number
}
