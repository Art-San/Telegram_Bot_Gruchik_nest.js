// // src/
// // |-- bot/
// // |   |-- bot.module.ts
// // |   |-- bot.service.ts
// // |   |-- bot.controller.ts (если используется)
// // |   |-- commands/
// // |       |-- setBotCommands.ts
// // |-- app.module.ts
// // |-- main.ts

import * as TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/users.service'
import { formatUserInfoMessage } from '../templates/user.templates'

export async function commandStart(
	telegramId: string,
	userName: string,
	userService: UserService
) {
	try {
		const user = await userService.getUserByTelegramId(telegramId)
		if (!user) {
			const newUser = await userService.createUser(userName, telegramId)
			return { msg: `${newUser.userName} добро пожаловать` }
		}
		await userService.updateUserIsActive(user.telegramId, user.isActive)
		return { msg: `${user.userName} хорошо что вернулся` }
	} catch (error) {
		console.log('Ошибка в commandStart', error)
		throw error
	}
}

export async function getUserInfoMessage(
	telegramId: string,
	userService: UserService
) {
	try {
		const user = await userService.getUserByTelegramId(telegramId)
		if (!user) {
			throw new Error('Пользователь не найден')
		}
		return formatUserInfoMessage(user)
	} catch (error) {
		console.log('Ошибка в commandStart', error)
		throw error
	}
}

export async function commandEnd(telegramId: string, userService: UserService) {
	try {
		const user = await userService.getUserByTelegramId(telegramId)
		if (!user) {
			throw new Error('Пользователь не найден')
		}

		if (user.isActive) {
			await userService.updateUserIsActive(user.telegramId, user.isActive)
			return { msg: `Всего хорошего ${user.userName}` }
		}

		return { msg: `Пока ${user.userName}` }
	} catch (error) {
		console.log('Ошибка в commandStart', error)
		throw error
	}
}
// trycatch

export function setBotCommands(bot: TelegramBot) {
	bot.setMyCommands([
		{ command: '/start', description: 'Запускает бота' },
		{ command: '/info', description: 'Получить информацию о пользователе' },
		{ command: '/end', description: 'Останавливает бота' },
		{ command: '/createorder', description: 'добавить заказ' },
		// { command: '/help', description: 'Останавливает бота' },
	])
}
// export function setBotCommandsAdmin(bot: TelegramBot) {
// 	bot.setMyCommands([
// 		{ command: '/start', description: 'Начальное приветствие админа' },
// 		{ command: '/info', description: 'Получить информацию о пользователе' },
// 		{ command: '/string', description: 'Игра строка для админа' },
// 		// Добавьте здесь другие команды
// 	])
// }
