import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import {
	getButtonAssignOrder,
	getButtonRequestAppointment,
} from './utils/buttons'
import * as TelegramBot from 'node-telegram-bot-api'
import { BotCommandsService } from 'src/bot/bot-commands.service'
// import { getUserInfoMessage, commandEnd } from './commands';

interface IData {
	chatId: string
	orderId: string
	authorId: string
	telegramId: string
	executorId: string
}
@Injectable()
export class MessageHandlerService {
	constructor(
		private readonly userService: UserService,
		private readonly ordersService: OrdersService,
		private readonly botCommandsService: BotCommandsService
	) {}

	async handleMessage(text: string, telegramId: number, chatId: number) {
		console.log(0, 'handleMessage')
	}

	async sendingMessageOrdersUsers(id: string) {
		try {
			const users = await this.userService.getAllUsersExceptTheAuthor(id)
			const usersTelegramId = users.map((user) => user.telegramId)
			return usersTelegramId
			// console.log(11, 'users', users)
		} catch (error) {
			console.log(
				0,
				'Ошибка в MessageHandlerService sendingMessageOrdersUsers',
				error
			)
			throw error.message
		}
	}

	async firstMessageAuthorExecutor(
		bot: TelegramBot,
		data: IData
		// chatId: string, orderId: string, authorId: string, executorId: string
	) {
		const { chatId, orderId, authorId, telegramId, executorId } = data
		try {
			const user = await this.userService.getUserByTelegramId(executorId)

			const isExecutorIdPresent =
				await this.ordersService.getPotentialExecutorIdOrder(
					orderId,
					executorId
				)

			if (user && !isExecutorIdPresent) {
				await this.ordersService.addPotentialExecutor(bot, {
					orderId,
					executorId,
				})

				const opts = getButtonAssignOrder(orderId, executorId)
				const response =
					await this.botCommandsService.getUserInfoMessage(telegramId)
				await bot.sendMessage(authorId, response, opts)
			}

			bot.sendMessage(chatId, 'Ожидайте несколько минут.')
		} catch (error) {
			console.error('Ошибка при обработке запроса на заказ:', error.message)
			bot.sendMessage(chatId, 'Произошла ошибка при обработке вашего запроса.')
		}
	}

	async secondMessageAuthorExecutor(
		bot: TelegramBot,
		chatId: string,
		orderId: string,
		idExecutor: string
	) {
		try {
			const res = await this.ordersService.assignUserToOrder(
				orderId,
				idExecutor
			)

			const opts: {
				parse_mode: 'HTML' | 'Markdown'
				reply_markup: {
					inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
				}
			} = {
				parse_mode: 'HTML',
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Принял',
								callback_data: `accepted_response_${orderId}`,
								// callback_data: `accepted_response_${orderId}_${authorId}`,
							},
						],
					],
				},
			}

			// const opts = getButtonRequestAppointment(orderId)

			bot.sendMessage(chatId, res.msg)
			bot.sendMessage(idExecutor, `Вы назначены на заказ № ${orderId}`, opts)
		} catch (error) {
			// console.log(
			// 	0,
			// 	'secondMessageAuthorExecutor добавление юзера к заказу',
			// 	error.message
			// )
			bot.sendMessage(chatId, error.message)
		}
	}
}

// try {
// 	const res = await this.ordersService.assignUserToOrder(
// 		orderId,
// 		idExecutor
// 	)

// 	bot.sendMessage(chatId, res.msg)
// 	bot.sendMessage(idExecutor, `Вы назначены на заказ № ${orderId}`)
// } catch (error) {
// 	console.log(
// 		0,
// 		'data.startsWith( добавление юзера к заказу',
// 		error.message
// 	)
// 	bot.sendMessage(chatId, error.message)
// }

// if (data.startsWith('order_response_')) {
// 	try {
// 		const orderId = data.split('_')[2]
// 		const authorId = data.split('_')[3]
// 		const user = await this.userService.getUserByTelegramId(executorId)

// 		const isExecutorIdPresent =
// 			await this.ordersService.getPotentialExecutorIdOrder(
// 				orderId,
// 				executorId
// 			)

// 		if (user && !isExecutorIdPresent) {
// 			await this.ordersService.addPotentialExecutor(bot, {
// 				orderId,
// 				executorId,
// 			})

// 			const opts: {
// 				parse_mode: 'HTML' | 'Markdown'
// 				reply_markup: {
// 					inline_keyboard: Array<
// 						Array<{ text: string; callback_data: string }>
// 					>
// 				}
// 			} = {
// 				parse_mode: 'HTML',
// 				reply_markup: {
// 					inline_keyboard: [
// 						[
// 							{
// 								text: 'Назначить',
// 								callback_data: `assign_user_${orderId}_${executorId}`,
// 							},
// 						],
// 					],
// 				},
// 			}

// 			const response =
// 				await this.botCommandsService.getUserInfoMessage(telegramId)
// 			bot.sendMessage(authorId, response, opts)
// 		} else {
// 			return bot.sendMessage(chatId, 'Хватит жмыкать.')
// 		}

// 		return bot.sendMessage(chatId, 'Ожидайте несколько минут.')
// 	} catch (error) {
// 		console.error('Ошибка при обработке запроса на заказ:', error)
// 		// Обработка ошибки, например, отправка сообщения пользователю
// 		bot.sendMessage(
// 			chatId,
// 			'Произошла ошибка при обработке вашего запроса.'
// 		)
// 	}
// }
