import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	Put,
} from '@nestjs/common'
import { UserService } from './users.service'
import { User, Profile } from '@prisma/client'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Post('create')
	async register(@Body() dto: any): Promise<User> {
		return this.userService.createUser(dto.userName, dto.telegramId)
	}

	@Get(':userId')
	async getUserById(@Param('userId') userId: string) {
		return this.userService.findUserById(userId)
	}

	@Put(':userId/profile')
	async updateUserProfile(
		@Param('userId') userId: string,
		@Body() profileData: UpdateProfileDto
	): Promise<Profile> {
		console.log(22, profileData)
		return this.userService.updateUserProfile(userId, profileData)
	}

	@Get()
	async getAll(
		@Query('searchTerm') searchTerm?: string,
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10
	) {
		console.log(123, 'getAll')
		return this.userService.searchUsers(searchTerm, +page, +pageSize)
	}

	@Get(':telegramId/profile')
	async getProfile(@Param('telegramId') telegramId: string) {
		console.log(123, 'telegramId', typeof telegramId)
		return { telegramId }
	}
}

// Profile
// profile
// telegramId
