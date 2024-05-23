import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	// formatOrderInfoMessageEnd,
	formatOrderInfoMessageInit,
} from 'src/bot/templates/order.templates'
import { MessageHandlerService } from 'src/message-handler/message-handler.service'

import { OrdersService } from 'src/orders/orders.service'

import { sendsOutToUsers } from './utils/user-message-sender'
import { UserService } from 'src/user/users.service'
import {
	getButtonEditSendOrder,
	getButtonOrderStatusPending,
} from 'src/message-handler/utils/buttons'
interface IData {
	text: string
	telegramId?: string
	chatId: string
}
@Injectable()
export class OrderProcessingService {
	constructor(
		private ordersService: OrdersService,
		private messageHandlerService: MessageHandlerService,
		private userService: UserService
	) {}

	private userOrders = new Map<
		string,
		{ orderData: any; currentStep: string; lastMessageId: number }
	>()

	async handleOrderCreation(
		bot: TelegramBot,
		data: IData,
		ctx?: TelegramBot.Message
	) {
		const { text, telegramId, chatId } = data
		const user = await this.userService.getUserByTelegramId(telegramId)

		if (!user) {
			bot.sendMessage(
				chatId,
				`У вас нет прав, а возможно вас нет в БД: нажмите <a>/start</a>`,
				{ parse_mode: 'HTML' }
			)
			return
		}
		let userOrder = this.userOrders.get(chatId)

		if (!userOrder) {
			userOrder = { orderData: {}, currentStep: '', lastMessageId: 0 }
			this.userOrders.set(chatId, userOrder)
		}

		// Удаляем предыдущее сообщение бота, если оно было отправлено
		if (userOrder.lastMessageId && userOrder.lastMessageId !== 0) {
			try {
				await bot.deleteMessage(chatId, userOrder.lastMessageId)
			} catch (error) {
				console.error(
					'Ошибка при удалении сообщения ботом orderProcessing.ts',
					error.message
				)
			}
		}

		let messageId: number
		if (text === '/createorder') {
			userOrder.currentStep = 'startTime'
			userOrder.orderData.authorId = user.telegramId
			userOrder.orderData.authorName = user.userName
			const message = await bot.sendMessage(
				chatId,
				'Введите время начала заказа:'
			)
			messageId = message.message_id
		} else if (userOrder.currentStep === 'startTime') {
			userOrder.orderData.startTime = text
			userOrder.currentStep = 'numExecutors'
			const message = await bot.sendMessage(
				chatId,
				'Введите количество грузчиков:'
			)
			messageId = message.message_id
		} else if (userOrder.currentStep === 'numExecutors') {
			userOrder.orderData.numExecutors = Number(text)
			userOrder.currentStep = 'text'
			const message = await bot.sendMessage(chatId, 'Введите детали заказа:')
			messageId = message.message_id
		} else if (userOrder.currentStep === 'text') {
			userOrder.orderData.text = text
			userOrder.currentStep = 'address'
			const message = await bot.sendMessage(chatId, 'Введите адрес:')
			messageId = message.message_id
		} else if (userOrder.currentStep === 'address') {
			userOrder.orderData.address = text
			userOrder.currentStep = 'hourCost'
			const message = await bot.sendMessage(chatId, 'Введите стоимость час:')
			messageId = message.message_id
		} else if (userOrder.currentStep === 'hourCost') {
			userOrder.orderData.hourCost = Number(text)
			userOrder.currentStep = null // Сброс состояния

			const templatesOrderInit = formatOrderInfoMessageInit(userOrder.orderData)

			const buttonEditSend = getButtonEditSendOrder()
			const message = await bot.sendMessage(
				chatId,
				`Новый заказ: ${templatesOrderInit}`,
				buttonEditSend
			)

			messageId = message.message_id
		}

		// Обновляем ID последнего сообщения бота
		if (messageId) {
			userOrder.lastMessageId = messageId
		}

		if (text === 'send_order') {
			if (
				Object.keys(userOrder.orderData).length === 0 &&
				userOrder.orderData.constructor === Object
			) {
				throw new Error('Заказ пуст')
			} else {
				try {
					const newOrder = await this.ordersService.creatingOrder(
						userOrder.orderData
					)
					const templatesOrderEnd = formatOrderInfoMessageInit(newOrder)

					const usersTelegramId =
						await this.messageHandlerService.sendingMessageOrdersUsers(
							newOrder.authorId
						)

					await sendsOutToUsers(bot, usersTelegramId, newOrder)

					const buttonEditStatus = getButtonOrderStatusPending(
						String(newOrder.id)
					)
					await bot.sendMessage(
						chatId,
						// `Заказ записан в бд, и отправлен юзерам`
						`<b>Новый заказ</b> записан в бд,
						и отправлен юзерам 
						${templatesOrderEnd}\n
						После того как назначите
						грузчиков на заявку ее нужно закрыть

						`,
						buttonEditStatus
					)

					userOrder.orderData = {}
				} catch (error) {
					userOrder.orderData = {}

					bot.sendMessage(chatId, 'Ошибка при сохранение заказа в БД')
				}
			}
		}
	}
}

// import * as TelegramBot from 'node-telegram-bot-api'
// import { IOrderData } from 'src/orders/dto/order.dto'
// import {
// 	formatOrderInfoMessageEnd,
// 	formatOrderInfoMessageInit,
// } from './templates/order.templates'
// import { OrdersService } from 'src/orders/orders.service'

// interface IData {
// 	text: string
// 	telegramId?: string
// 	chatId: string
// }

// Используйте Map для хранения данных о заказе и текущем шаге для каждого пользователя
// const userOrders = new Map<string, { orderData: any; currentStep: string }>()

// export async function handleOrderCreation(
// 	bot: TelegramBot,
// 	ordersService: OrdersService,
// 	data: IData
// ) {
// 	const { text, telegramId, chatId } = data

// 	// Получаем данные о заказе и текущий шаг для данного пользователя
// 	let userOrder = userOrders.get(chatId)
// 	if (!userOrder) {
// 		userOrder = { orderData: {}, currentStep: '' }
// 		userOrders.set(chatId, userOrder)
// 	}

// 	if (text === '/createorder') {
// 		userOrder.currentStep = 'startTime'
// 		userOrder.orderData.createdBy = telegramId
// 		bot.sendMessage(chatId, 'Введите время начала заказа:')
// 	} else if (userOrder.currentStep === 'startTime') {
// 		userOrder.orderData.startTime = text
// 		userOrder.currentStep = 'numExecutors'
// 		bot.sendMessage(chatId, 'Введите количество грузчиков:')
// 	} else if (userOrder.currentStep === 'numExecutors') {
// 		userOrder.orderData.numExecutors = Number(text)
// 		userOrder.currentStep = 'text'
// 		bot.sendMessage(chatId, 'Введите детали заказа:')
// 	} else if (userOrder.currentStep === 'text') {
// 		userOrder.orderData.text = text
// 		userOrder.currentStep = 'address'
// 		bot.sendMessage(chatId, 'Введите адрес:')
// 	} else if (userOrder.currentStep === 'address') {
// 		userOrder.orderData.address = text
// 		userOrder.currentStep = 'hourCost'
// 		bot.sendMessage(chatId, 'Введите стоимость час:')
// 	} else if (userOrder.currentStep === 'hourCost') {
// 		userOrder.orderData.hourCost = Number(text)
// 		userOrder.currentStep = '' // Сброс состояния

// 		const { templatesOrderInit, buttonsOrder } = formatOrderInfoMessageInit(
// 			userOrder.orderData
// 		)

// 		bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
// 			...buttonsOrder,
// 			parse_mode: 'HTML',
// 		})
// 	}

// 	if (text === 'send_order') {
// 		if (
// 			Object.keys(userOrder.orderData).length === 0 &&
// 			userOrder.orderData.constructor === Object
// 		) {
// 			throw new Error('Заказ пуст')
// 		} else {
// 			try {
// 				const newOrder = await ordersService.creatingOrder(userOrder.orderData)
// 				const templatesOrderEnd = formatOrderInfoMessageEnd(newOrder)

// 				userOrder.orderData = {}
// 				console.log(0, 'userOrders.size', userOrders.size)
// 				bot.sendMessage(chatId, 'Заказ записан в бд, и отправлен юзерам')
// 				bot.sendMessage(chatId, templatesOrderEnd, {
// 					parse_mode: 'HTML',
// 				})
// 			} catch (error) {
// 				userOrder.orderData = {}
// 				bot.sendMessage(chatId, 'Ошибка при сохранение заказа в БД')
// 			}
// 		}
// 	}
// }
