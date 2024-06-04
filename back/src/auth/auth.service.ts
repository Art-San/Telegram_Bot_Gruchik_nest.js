import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserService } from 'src/user/users.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService
		// private passwordService: PasswordService,
		// private jwtService: JwtService
	) {}
	async login(userName: string, telegramId: string) {
		try {
			const user = await this.userService.findUserTelegramId(telegramId)
			if (!user) {
				throw new UnauthorizedException({ type: 'не верный telegramId' })
			}
			if (user.userName !== userName) {
				throw new UnauthorizedException({ type: 'что то вел не так' })
			}

			// const accessToken = await this.jwtService.signAsync({
			// 	telegramId: user.telegramId,
			// 	userName: user.userName,
			// })

			return user
			// return { accessToken }
		} catch (error) {
			throw error
		}
	}

	// findAll() {
	// 	return `This action returns all auth`
	// }

	// findOne(id: number) {
	// 	return `This action returns a #${id} auth`
	// }

	// update(id: number, updateAuthDto: UpdateAuthDto) {
	// 	return `This action updates a #${id} auth`
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} auth`
	// }
}
