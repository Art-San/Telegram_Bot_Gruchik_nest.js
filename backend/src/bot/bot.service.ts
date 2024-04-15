import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	setBotCommands,
	commandEnd,
	getUserInfoMessage,
} from './commands/setBotCommands'

import { DbService } from 'src/db/db.service'
import { UserService } from 'src/user/users.service'

import { OrdersService } from 'src/orders/orders.service'

import { handleOrderCreation } from './orderProcessing'
import { handleUserCreation } from './userProcessing'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/helpers-CTX'

@Injectable()
export class BotService implements OnModuleInit {
	constructor(
		private readonly db: DbService,
		private readonly userService: UserService,
		private readonly ordersService: OrdersService
	) {}

	async onModuleInit() {
		await this.botMessage()
	}

	async botMessage() {
		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		setBotCommands(bot)

		// let orderData: IOrderData = {}
		// let currentStep = ''

		bot.on('callback_query', async (ctx) => {
			const { data, telegramId, chatId } = extractInfoCallbackQueryCTX(ctx)

			if (data === 'edit_order') {
				await handleOrderCreation(bot, {
					text: '/createorder',
					telegramId,
					chatId,
				})
			} else if (data === 'send_order') {
				bot.sendMessage(chatId, 'Отправлена заявка')
				console.log(1, 'send_order')
			}
		})

		bot.on('message', async (ctx) => {
			const { text, telegramId, chatId, userName } =
				getUserDetailsFromTelegramContext(ctx)

			await handleUserCreation(bot, this.userService, {
				text,
				telegramId,
				chatId,
				userName,
			})
			console.log(0, 'chatId', chatId)
			await handleOrderCreation(bot, { text, telegramId, chatId })

			if (text == '/help') {
				await bot.sendMessage(
					chatId,
					`Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`,
					{
						parse_mode: 'HTML',
					}
				)
			}

			if (text === '/info') {
				try {
					const response = await getUserInfoMessage(
						telegramId,
						this.userService
					)
					bot.sendMessage(chatId, response, {
						parse_mode: 'HTML',
					})
				} catch (error) {
					console.error('Ошибка при обработке команды /info', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /info.'
					)
				}
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
