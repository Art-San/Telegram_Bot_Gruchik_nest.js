// src/users/dto/update-profile.dto.ts
import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator'

export class UpdateProfileDto {
	@IsOptional()
	@IsString()
	telegramId?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsString()
	fullName?: string

	@IsOptional()
	@IsUrl()
	userAvatar?: string

	@IsOptional()
	@IsString()
	role?: string

	@IsOptional()
	@IsInt()
	rating?: number
}

// // src/users/dto/update-profile.dto.ts
// import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator'

// export class UpdateProfileDto {
// 	@IsOptional()
// 	@IsString()
// 	telegramId?: string

// 	@IsOptional()
// 	@IsString()
// 	phone?: string

// 	@IsOptional()
// 	@IsString()
// 	fullName?: string

// 	@IsOptional()
// 	@IsUrl()
// 	userAvatar?: string

// 	@IsOptional()
// 	@IsString()
// 	role?: string

// 	@IsOptional()
// 	@IsInt()
// 	rating?: number
// }
