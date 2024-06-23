import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
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
		@Query('searchTerm') searchTerm?: string,
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10
	) {
		console.log(11, page)
		console.log(11, pageSize)
		console.log(11, searchTerm)
		return this.userService.searchUsers(searchTerm, +page, +pageSize)
	}
}
