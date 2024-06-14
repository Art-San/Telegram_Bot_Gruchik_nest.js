import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
		// private passwordService: PasswordService,
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

			const accessToken = await this.jwtService.signAsync({
				telegramId: user.telegramId,
				userName: user.userName,
			})

			const data = {
				telegramId: user.telegramId,
				userName: user.userName,
			}

			console.log(user)
			// return user
			return { data, accessToken }
		} catch (error) {
			throw error
		}
	}
	async isAdmin(userName: string, telegramId: string) {
		try {
			const user = await this.userService.findUserTelegramId(telegramId)
			if (!user) {
				throw new UnauthorizedException({ type: 'не верный telegramId' })
			}
			if (user.userName !== userName) {
				throw new UnauthorizedException({ type: 'что то вел не так' })
			}

			// return user
			return user.isAdmin
		} catch (error) {
			throw error
		}
	}
	async isAdmin2(telegramId: string) {
		try {
			const user = await this.userService.findUserTelegramId(telegramId)
			if (!user) {
				throw new UnauthorizedException({ type: 'не верный telegramId' })
			}
			return user.isAdmin
		} catch (error) {
			throw error
		}
	}
}
