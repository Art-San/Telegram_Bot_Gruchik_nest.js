import * as TelegramBot from 'node-telegram-bot-api'
import { commandStart } from './commands/setBotCommands'
import { UserService } from 'src/user/users.service'

export async function handleUserCreation(
	ctx: any,
	bot: TelegramBot,
	userService: UserService
) {
	const text = ctx.text
	const telegramId = String(ctx.from.id)
	const chatId = String(ctx.chat.id)
	const userName = ctx.from.username
		? `@${ctx.from.username}`
		: `${ctx.from.first_name} ${ctx.from.last_name}`

	// console.log(1, text)
	// console.log(2, telegramId)
	// console.log(3, userName)

	if (text === '/start') {
		try {
			const response = await commandStart(telegramId, userName, userService)
			bot.sendMessage(chatId, response.msg)
			// bot.sendMessage(chatId, 'ok')
		} catch (error) {
			console.error('Ошибка при обработке команды /start:', error.message)
			bot.sendMessage(chatId, 'Произошла ошибка при обработке команды /start.')
		}
	}
}
