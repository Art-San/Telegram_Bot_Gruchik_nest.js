import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	setBotCommands,
	commandStart,
	commandEnd,
} from './commands/setBotCommands'

import { DbService } from 'src/db/db.service'
import { UserService } from 'src/user/users.service'

@Injectable()
export class BotService implements OnModuleInit {
	constructor(
		private readonly db: DbService,
		private readonly userService: UserService
	) {}

	async onModuleInit() {
		await this.botMessage()
	}

	async botMessage() {
		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		setBotCommands(bot)

		bot.on('message', async (ctx) => {
			const text = ctx.text
			const telegramId = String(ctx.from.id)
			const chatId = String(ctx.chat.id)
			const userName = ctx.from.username
				? `@${ctx.from.username}`
				: `${ctx.from.first_name} ${ctx.from.last_name}`

			if (text === '/start') {
				try {
					const response = await commandStart(
						telegramId,
						userName,
						this.userService
					)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error('Ошибка при обработке команды /start:', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /start.'
					)
				}
			}

			if (text === '/info') {
				console.log(1, 'info')
			}

			if (text === '/end') {
				try {
					const response = await commandEnd(telegramId, this.userService)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error('Ошибка при обработке команды /end:', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /end.'
					)
				}
			}
		})

		bot.on('polling_error', (err) => console.log(err.message))
	}
}
