import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	userName: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsString()
	password: string
}

export class GetSessionInfoDto {
	telegramId: number

	userName: string

	'iat': number

	'exp': number
}
