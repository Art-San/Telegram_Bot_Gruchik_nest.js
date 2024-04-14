import * as TelegramBot from 'node-telegram-bot-api'
import { commandStart } from './commands/setBotCommands'
import { UserService } from 'src/user/users.service'

interface IData {
	text: string
	telegramId: string
	chatId: string
	userName: string
}
export async function handleUserCreation(
	bot: TelegramBot,
	userService: UserService,
	data: IData
) {
	const { text, telegramId, chatId, userName } = data
	// const text = ctx.text
	// const telegramId = String(ctx.from.id)
	// const chatId = String(ctx.chat.id)
	// const userName = ctx.from.username
	// 	? `@${ctx.from.username}`
	// 	: `${ctx.from.first_name} ${ctx.from.last_name}`

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
