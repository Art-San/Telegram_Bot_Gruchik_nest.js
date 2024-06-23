// src/shared/types/profile.types.ts
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
