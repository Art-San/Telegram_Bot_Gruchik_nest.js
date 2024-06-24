// src/users/dto/update-profile.dto.ts
// src/users/dto/update-profile.dto.ts
import { IsOptional, IsString, IsEnum, IsUrl } from 'class-validator'
import { Role, Experience } from '@prisma/client'

export class UpdateProfileDto {
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
	@IsEnum(Role)
	role?: Role
}

// {
// 	"userName": "@gruzz70tomsk",
// 	"telegramId": "721836748",
//   "phone": "+79138183456",
//   "fullName": "Тарк",
//   "userAvatar": "https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg",
//   "role": "mover"
// }

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
