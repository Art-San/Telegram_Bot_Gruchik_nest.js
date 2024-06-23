// src/shared/types/user.types.ts
import { IProfile } from './profile.types'

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

export interface IPaginationResult<T> {
	data: T[]
	totalPages: number
}
