import { Injectable } from '@nestjs/common'
import { DbService } from 'db/db.service'

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
}
