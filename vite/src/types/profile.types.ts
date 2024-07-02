export interface IProfileResponse {
  id: number
  userId: number
  telegramId: string
  phone: string
  fullName: string
  userAvatar: string
  role: string
  experience: string
  rating: number
  createdAt: string
  updatedAt: string
}
export interface IProfile {
  id: number
  userId: number
  telegramId: string
  phone: string
  fullName: string
  userAvatar: string
  role: string
  experience: string
  rating: number
  createdAt: string
  updatedAt: string
}
export interface IDataFormCreateProfile {
  phone: string
  fullName: string
  userAvatar?: string
}
export interface IDataFormUpdateProfile {
  phone?: string
  fullName?: string
  userAvatar?: string
  role?: string
}

export interface IUpdateProfileParams {
  userId: number
  data: IDataFormUpdateProfile
}
