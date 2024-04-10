import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Post('create')
	async register(@Body() dto: RegisterDto) {
		return this.userService.createUser(dto.userName, dto.telegramId)
	}
}
