import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/users.service'
import { formatUserInfoMessage } from './templates/user.templates'

@Injectable()
export class BotCommandsService {
	constructor(private userService: UserService) {}

	async commandStart(telegramId: string, userName: string) {
		try {
			const user = await this.userService.getUserByTelegramId(telegramId)
			if (!user) {
				const newUser = await this.userService.createUser(userName, telegramId)
				return { msg: `${newUser.userName} добро пожаловать` }
			}

			if (user.isBlocked) {
				return { msg: 'Бот заблокирован' }
			}

			if (!user.isActive) {
				await this.userService.updateUserIsActive(user.telegramId, true)
				return { msg: `${user.userName} хорошо что вернулся` }
			}

			return { msg: `Бот уже запущен` }
		} catch (error) {
			console.error('Ошибка в commandStart', error)
			throw error
		}
	}

	async getUserInfoMessage(telegramId: string) {
		try {
			const user = await this.userService.getUserByTelegramId(telegramId)
			if (!user) {
				throw new Error('Пользователь не найден')
			}
			return formatUserInfoMessage(user)
		} catch (error) {
			console.log('Ошибка в getUserInfoMessage', error)
			throw error
		}
	}

	async commandEnd(telegramId: string) {
		try {
			const user = await this.userService.getUserByTelegramId(telegramId)
			if (!user) {
				throw new Error('Пользователь не найден')
			}

			if (user.isActive) {
				await this.userService.updateUserIsActive(user.telegramId, false)
				return { msg: `Всего хорошего ${user.userName}` }
			}

			return { msg: `Бот остановлен` }
		} catch (error) {
			console.error('Ошибка в commandEnd', error)
			throw error
		}
	}

	setBotCommands(bot: TelegramBot) {
		bot.setMyCommands([
			{ command: '/start', description: 'Запускает бота' },
			{ command: '/info', description: 'Получить информацию о пользователе' },
			{ command: '/createorder', description: 'добавить заказ, вопросы' },
			{ command: '/help', description: 'пример HTML тегов' },
			{ command: '/end', description: 'Останавливает бота' },
			{ command: '/add_order', description: 'Создание заказа через форму' },
		])
	}
}
