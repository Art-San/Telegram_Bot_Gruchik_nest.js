// src/users/dto/user.dto.ts
import { IProfile } from 'src/shared/types/profile.types'

export class UserDto {
	id: number
	telegramId: string
	userName: string
	firstLastName?: string
	userAvatar?: string
	isActive: boolean
	isBlocked: boolean
	isAdmin: boolean
	profile?: IProfile
	profileFilled: boolean
	createdAt: string
	updatedAt: string
}
