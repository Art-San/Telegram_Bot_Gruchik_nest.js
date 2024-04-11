import * as TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/users.service'

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
		return { msg: `${user.userName} хорошо что вернулся` }
	} catch (error) {
		console.log('Ошибка в commandStart', error)
		throw error
	}
}

export function setBotCommandsUser(bot: TelegramBot) {
	bot.setMyCommands([
		{ command: '/start', description: 'Начальное приветствие юзера' },
		{ command: '/info', description: 'Получить информацию о пользователе' },
		{ command: '/help', description: 'Игра число' },
	])
}
export function setBotCommandsAdmin(bot: TelegramBot) {
	bot.setMyCommands([
		{ command: '/start', description: 'Начальное приветствие админа' },
		{ command: '/info', description: 'Получить информацию о пользователе' },
		{ command: '/string', description: 'Игра строка для админа' },
		// Добавьте здесь другие команды
	])
}
