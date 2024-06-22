import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from './users.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Post('create')
	async register(@Body() dto: any) {
		return this.userService.createUser(dto.userName, dto.telegramId)
	}

	@Get()
	async getAll(
		@Query('searchTerm')
		searchTerm?: string
	) {
		return this.userService.searchUsers(searchTerm)
	}
}
