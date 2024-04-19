import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'

import { BotCommandsService } from './bot-commands.service'
import { OrderProcessingService } from 'src/orders/order-processing.service'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import { MessageHandlerService } from 'src/message-handler/message-handler.service'

@Injectable()
export class BotService implements OnModuleInit {
	constructor(
		private readonly botCommandsService: BotCommandsService,
		private readonly orderProcessingService: OrderProcessingService,
		private readonly userService: UserService,
		private readonly ordersService: OrdersService,
		private readonly messageHandlerService: MessageHandlerService
	) {}

	async onModuleInit() {
		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})

		this.botCommandsService.setBotCommands(bot)

		bot.on('callback_query', async (ctx) => {
			const { data, telegramId, chatId, executorId } =
				extractInfoCallbackQueryCTX(ctx)

			if (data === 'edit_order') {
				await this.orderProcessingService.handleOrderCreation(bot, {
					text: '/createorder',
					telegramId,
					chatId,
				})
			} else if (data === 'send_order') {
				try {
					await this.orderProcessingService.handleOrderCreation(bot, {
						text: 'send_order',
						telegramId,
						chatId,
					})
				} catch (error) {
					bot.sendMessage(chatId, error.message)
				}
			}
			if (data.startsWith('order_response_')) {
				const orderId = data.split('_')[2]
				const authorId = data.split('_')[3]

				await this.messageHandlerService.firstMessageAuthorExecutor(bot, {
					chatId,
					orderId,
					authorId,
					telegramId,
					executorId,
				})

				// try {
				// 	const orderId = data.split('_')[2]
				// 	const authorId = data.split('_')[3]
				// 	const user = await this.userService.getUserByTelegramId(executorId)

				// 	const isExecutorIdPresent =
				// 		await this.ordersService.getPotentialExecutorIdOrder(
				// 			orderId,
				// 			executorId
				// 		)

				// 	if (user && !isExecutorIdPresent) {
				// 		await this.ordersService.addPotentialExecutor(bot, {
				// 			orderId,
				// 			executorId,
				// 		})

				// 		const opts: {
				// 			parse_mode: 'HTML' | 'Markdown'
				// 			reply_markup: {
				// 				inline_keyboard: Array<
				// 					Array<{ text: string; callback_data: string }>
				// 				>
				// 			}
				// 		} = {
				// 			parse_mode: 'HTML',
				// 			reply_markup: {
				// 				inline_keyboard: [
				// 					[
				// 						{
				// 							text: 'Назначить',
				// 							callback_data: `assign_user_${orderId}_${executorId}`,
				// 						},
				// 					],
				// 				],
				// 			},
				// 		}

				// 		const response =
				// 			await this.botCommandsService.getUserInfoMessage(telegramId)
				// 		bot.sendMessage(authorId, response, opts)
				// 	} else {
				// 		return bot.sendMessage(chatId, 'Хватит жмыкать.')
				// 	}

				// 	return bot.sendMessage(chatId, 'Ожидайте несколько минут.')
				// } catch (error) {
				// 	console.error('Ошибка при обработке запроса на заказ:', error)
				// 	// Обработка ошибки, например, отправка сообщения пользователю
				// 	bot.sendMessage(
				// 		chatId,
				// 		'Произошла ошибка при обработке вашего запроса.'
				// 	)
				// }
			}

			if (data.startsWith('assign_user_')) {
				const orderId = data.split('_')[2]
				const idExecutor = data.split('_')[3]
				try {
					const res = await this.ordersService.assignUserToOrder(
						orderId,
						idExecutor
					)

					/*TODO: */ // const {msgAuthor, msgExecutor}= finalMessageAuthorExecutor()

					bot.sendMessage(chatId, res.msg)
					bot.sendMessage(idExecutor, `Вы назначены на заказ № ${orderId}`)
				} catch (error) {
					console.log(
						0,
						'data.startsWith( добавление юзера к заказу',
						error.message
					)
					bot.sendMessage(chatId, error.message)
				}
			}
		})

		bot.on('message', async (ctx) => {
			// console.log(1, ctx)
			const { text, telegramId, chatId, userName } =
				getUserDetailsFromTelegramContext(ctx)

			if (text === '/start') {
				try {
					const response = await this.botCommandsService.commandStart(
						telegramId,
						userName
					)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error('Ошибка при обработке команды /start:', error.message)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /start.'
					)
				}
			}

			await this.orderProcessingService.handleOrderCreation(bot, {
				text,
				telegramId,
				chatId,
			})

			if (text === '/info') {
				try {
					const response =
						await this.botCommandsService.getUserInfoMessage(telegramId)
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
		})

		bot.on('polling_error', (err) => console.log(err.message))
	}
}

// import { Injectable, OnModuleInit } from '@nestjs/common'
// import * as TelegramBot from 'node-telegram-bot-api'
// import {
// 	setBotCommands,
// 	commandEnd,
// 	getUserInfoMessage,
// } from './commands/setBotCommands'

// import { DbService } from 'src/db/db.service'
// import { UserService } from 'src/user/users.service'

// import { OrdersService } from 'src/orders/orders.service'

// import { handleOrderCreation } from './orderProcessing'
// import { handleUserCreation } from './userProcessing'
// import {
// 	extractInfoCallbackQueryCTX,
// 	getUserDetailsFromTelegramContext,
// } from './utils/helpers-CTX'

// @Injectable()
// export class BotService implements OnModuleInit {
// 	constructor(
// 		private readonly db: DbService,
// 		private readonly userService: UserService,
// 		private readonly ordersService: OrdersService
// 	) {}

// 	async onModuleInit() {
// 		await this.botMessage()
// 	}

// 	async botMessage() {
// 		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 			polling: true,
// 		})
// 		setBotCommands(bot)

// 		bot.on('callback_query', async (ctx) => {
// 			const { data, telegramId, chatId } = extractInfoCallbackQueryCTX(ctx)

// 			if (data === 'edit_order') {
// 				await handleOrderCreation(bot, this.ordersService, {
// 					text: '/createorder',
// 					telegramId,
// 					chatId,
// 				})
// 			} else if (data === 'send_order') {
// 				try {
// 					await handleOrderCreation(bot, this.ordersService, {
// 						text: 'send_order',
// 						telegramId,
// 						chatId,
// 					})
// 				} catch (error) {
// 					bot.sendMessage(chatId, error.message)
// 				}

// 				// console.log(1, 'send_order')
// 			}
// 		})

// 		bot.on('message', async (ctx) => {
// 			const { text, telegramId, chatId, userName } =
// 				getUserDetailsFromTelegramContext(ctx)

// 			await handleUserCreation(bot, this.userService, {
// 				text,
// 				telegramId,
// 				chatId,
// 				userName,
// 			})
// 			// console.log(0, 'chatId', chatId)
// 			await handleOrderCreation(bot, this.ordersService, {
// 				text,
// 				telegramId,
// 				chatId,
// 			})

// 			if (text == '/help') {
// 				await bot.sendMessage(
// 					chatId,
// 					`Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`,
// 					{
// 						parse_mode: 'HTML',
// 					}
// 				)
// 			}

// 			if (text === '/info') {
// 				try {
// 					const response = await getUserInfoMessage(
// 						telegramId,
// 						this.userService
// 					)
// 					bot.sendMessage(chatId, response, {
// 						parse_mode: 'HTML',
// 					})
// 				} catch (error) {
// 					console.error('Ошибка при обработке команды /info', error)
// 					bot.sendMessage(
// 						chatId,
// 						'Произошла ошибка при обработке команды /info.'
// 					)
// 				}
// 			}

// 			if (text === '/end') {
// 				try {
// 					const response = await commandEnd(telegramId, this.userService)
// 					bot.sendMessage(chatId, response.msg)
// 				} catch (error) {
// 					console.error('Ошибка при обработке команды /end:', error)
// 					bot.sendMessage(
// 						chatId,
// 						'Произошла ошибка при обработке команды /end.'
// 					)
// 				}
// 			}
// 		})

// 		bot.on('polling_error', (err) => console.log(err.message))
// 	}
// }
