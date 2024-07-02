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
	): Promise<Profile | string> {
		console.log(122, profileData)
		return this.userService.updateUserProfile(userId, profileData)
	}

	// http://localhost:3001/api/users/1/profile

	@Get(':userId/profile')
	async getProfile(@Param('userId') userId: string) {
		console.log(124, 'userId', userId)
		const res = await this.userService.findProfileByUserId(userId)
		console.log(124, res)
		return res
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
}

// Profile
// profile
// telegramId
