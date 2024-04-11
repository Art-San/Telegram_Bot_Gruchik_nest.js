import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'

@Injectable()
export class UserService {
	constructor(private readonly db: DbService) {}

	async createUser(userName: string, telegramId: string) {
		try {
			const existingUser = await this.db.user.findUnique({
				where: { telegramId: telegramId },
			})

			if (existingUser) {
				console.log('Пользователь с таким telegramId уже существует')

				return existingUser
			} else {
				const newUser = await this.db.user.create({
					data: { userName, telegramId },
				})
				return newUser
			}
		} catch (error) {
			console.error('Ошибка при регистрации пользователя:', error)
			throw error
		}
	}

	async getAllUsers() {
		try {
			const users = await this.db.user.findMany()
			return users
		} catch (error) {
			console.log('Ошибка в getAllUsers', error)
			throw error
		}
	}
	async getUserByTelegramId(telegramId: string) {
		try {
			const users = await this.db.user.findUnique({ where: { telegramId } })
			return users
		} catch (error) {
			console.log('Ошибка в getAllUsers', error)
			throw error
		}
	}

	async getRootUsers() {
		try {
			const adminUsers = await this.db.user.findMany({
				where: {
					root: true,
				},
			})
			return adminUsers
		} catch (error) {
			console.log('Ошибка при получении getRootUsers', error)
			throw error
		}
	}
}
