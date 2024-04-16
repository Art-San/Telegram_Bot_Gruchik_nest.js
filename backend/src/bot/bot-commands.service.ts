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
			await this.userService.updateUserIsActive(user.telegramId, user.isActive)
			return { msg: `${user.userName} хорошо что вернулся` }
		} catch (error) {
			console.log('Ошибка в commandStart', error)
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
			console.log('Ошибка в commandStart', error)
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
				await this.userService.updateUserIsActive(
					user.telegramId,
					user.isActive
				)
				return { msg: `Всего хорошего ${user.userName}` }
			}

			return { msg: `Пока ${user.userName}` }
		} catch (error) {
			console.log('Ошибка в commandStart', error)
			throw error
		}
	}

	setBotCommands(bot: TelegramBot) {
		bot.setMyCommands([
			{ command: '/start', description: 'Запускает бота' },
			{ command: '/info', description: 'Получить информацию о пользователе' },
			{ command: '/createorder', description: 'добавить заказ' },
			// { command: '/end', description: 'Останавливает бота' },
			// { command: '/help', description: 'пример HTML тегов' },
		])
	}
}
