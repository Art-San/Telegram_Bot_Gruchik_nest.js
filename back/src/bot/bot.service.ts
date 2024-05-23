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
		const webAppUrl = process.env.NGROK_URL
		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})

		this.botCommandsService.setBotCommands(bot)

		bot.on('callback_query', async (ctx) => {
			console.log(13, 'callback_query ctx', ctx)

			// entities
			const { data, telegramId, chatId, executorId } =
				extractInfoCallbackQueryCTX(ctx)

			// Кнопка 'Редактировать'
			if (data === 'edit_order') {
				await this.orderProcessingService.handleOrderCreation(bot, {
					text: '/createorder',
					telegramId,
					chatId,
				})
				// Кнопка 'Отправить'
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

			if (data.startsWith('order_status_')) {
				console.log(2, 'Грузчики набраны')
			}
			// ====== Кнопка  'Запрос'
			if (data.startsWith('order_response_')) {
				// console.log(1, 'Запрос', data)

				const orderId = data.split('_')[2]
				const authorId = data.split('_')[3]
				const skip = data.split('_')[4]
				if (skip) {
					// await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
					return
				}

				await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)

				await this.messageHandlerService.firstMessageAuthorExecutor(bot, {
					chatId,
					orderId,
					authorId,
					telegramId,
					executorId,
				})
			}

			// ====== Кнопка  'Назначить'
			if (data.startsWith('assign_user_')) {
				console.log(2, 'Назначить')
				const orderId = data.split('_')[2]
				const idExecutor = data.split('_')[3]
				await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
				/*TODO: */
				await this.messageHandlerService.secondMessageAuthorExecutor(
					bot,
					chatId,
					orderId,
					idExecutor
				)
			}
			// ====== Кнопка  'Принято'
			if (data.startsWith('accepted_response_')) {
				console.log(3, 'Принял')
				const orderId = data.split('_')[2] // Извлечение orderId из callback_data
				const idExecutor = data.split('_')[3]

				try {
					// console.log(4, orderId)
					// console.log(5, idExecutor)
					await this.messageHandlerService.finishMessageExecutor(
						bot,
						chatId,
						orderId,
						idExecutor
					)
					// Удаление сообщения с кнопкой
					await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
					// Здесь можно добавить дополнительную логику, например, обновление статуса заказа в базе данных
				} catch (error) {
					console.error(0, 'Ошибка при удалении сообщения:', error)
				}
			}

			if (data.startsWith('delete_message_')) {
				console.log(3, 'Кнопка удалить сообщение')

				try {
					await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
				} catch (error) {
					console.error(0, 'Ошибка при удалении сообщения:', error)
				}
			}
		})

		bot.on('message', async (ctx) => {
			// console.log(11, 'message ctx', ctx)

			const { text, telegramId, chatId, userName, nameButton, dataButton } =
				getUserDetailsFromTelegramContext(ctx)

			// console.log(11, text)
			// console.log(11, telegramId)
			// console.log(11, chatId)
			// console.log(11, userName)
			// console.log(11, nameButton)
			// console.log(11, dataButton)

			if (nameButton === 'Создать заявку') {
				const authorData = { authorId: telegramId, authorName: userName }
				const formData = JSON.parse(dataButton)
				const data = { ...authorData, ...formData }

				try {
					await this.orderProcessingService.handleOrderCreationForm(
						bot,
						chatId,
						data
					)
				} catch (error) {
					console.log(0, 'Ошибка при обработке <Создать заявку>', error.message)
					bot.sendMessage(chatId, error.message)
				}
			}

			if (text === '/start') {
				try {
					const response = await this.botCommandsService.commandStart(
						telegramId,
						userName
					)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error(
						0,
						'Ошибка при обработке команды /start:',
						error.message
					)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /start.'
					)
				}
			}

			await this.orderProcessingService.handleOrderCreation(
				bot,
				{
					text,
					telegramId,
					chatId,
				},
				ctx
			)

			if (text === '/info') {
				try {
					const response =
						await this.botCommandsService.getUserInfoMessage(telegramId)
					bot.sendMessage(chatId, response, {
						parse_mode: 'HTML',
					})
				} catch (error) {
					console.error(0, 'Ошибка при обработке команды /info', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /info.'
					)
				}
			}

			if (text == '/help') {
				await bot.sendMessage(
					chatId,
					`Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`,
					{
						parse_mode: 'HTML',
					}
				)
			}

			if (text === '/end') {
				try {
					const response = await this.botCommandsService.commandEnd(telegramId)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error(0, 'Ошибка при обработке команды /end:', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /end.'
					)
				}
			}
			if (text === '/add_order') {
				await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
					reply_markup: {
						keyboard: [
							[
								{
									text: 'Создать заявку',
									web_app: { url: webAppUrl + '/add_order' },
								},
							],
						],
					},
				})
			}
		})

		bot.on('polling_error', (err) => console.log('polling_error', err.message))
	}
}
