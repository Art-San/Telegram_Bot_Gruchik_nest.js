// telegramId     String     @unique
// userName       String

import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@MinLength(2, {
		message: 'Слишком короткое имя',
	})
	@IsString()
	userName: string

	@IsNotEmpty()
	telegramId: string
}
