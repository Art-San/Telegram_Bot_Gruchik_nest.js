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

	async getAllUsersExceptTheAuthor(authorId: string) {
		try {
			const users = await this.db.user.findMany({
				where: {
					telegramId: {
						not: authorId, // Исключаем автора заказа
					},
				},
			})
			return users
		} catch (error) {
			console.log('getAllUsersExceptTheAuthor', error)
			throw error
		}
	}
	async getUserByTelegramId(telegramId: string) {
		try {
			const user = await this.db.user.findUnique({ where: { telegramId } })
			return user
		} catch (error) {
			console.log('Ошибка в getUserByTelegramId', error)
			throw error
		}
	}

	async updateUserIsActive(telegramId: string, isActive) {
		try {
			await this.db.user.update({
				where: { telegramId }, // Предполагаем, что у вас есть поле id в модели User
				data: { isActive: isActive },
			})
			return { msg: 'Обновление поля isActive  на противоположное значение' }
		} catch (error) {
			console.log('Ошибка в updateUserIsActive', error)
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
