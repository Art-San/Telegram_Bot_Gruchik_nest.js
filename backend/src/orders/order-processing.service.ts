// import { Injectable } from '@nestjs/common'
// import { UserService } from 'src/user/users.service'
// import { OrdersService } from 'src/orders/orders.service'

// @Injectable()
// export class OrderProcessingService {
// 	constructor(
// 		private userService: UserService,
// 		private ordersService: OrdersService
// 	) {}

// 	// Ваш код здесь
// }

import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	formatOrderInfoMessageEnd,
	formatOrderInfoMessageInit,
} from 'src/bot/templates/order.templates'
import { IOrderData } from 'src/orders/dto/order.dto'

import { OrdersService } from 'src/orders/orders.service'
interface IData {
	text: string
	telegramId?: string
	chatId: string
}
@Injectable()
export class OrderProcessingService {
	constructor(private ordersService: OrdersService) {}

	private userOrders = new Map<
		string,
		{ orderData: any; currentStep: string; lastMessageId: number }
	>()

	async handleOrderCreation(bot: TelegramBot, data: IData) {
		const { text, telegramId, chatId } = data

		let userOrder = this.userOrders.get(chatId)
		console.log(0, userOrder)
		if (!userOrder) {
			userOrder = { orderData: {}, currentStep: '', lastMessageId: 0 }
			this.userOrders.set(chatId, userOrder)
		}

		// Ваш код здесь

		// Удаляем предыдущее сообщение бота, если оно было отправлено
		if (userOrder.lastMessageId && userOrder.lastMessageId !== 0) {
			try {
				await bot.deleteMessage(chatId, userOrder.lastMessageId)
			} catch (error) {
				console.error(
					'Ошибка при удалении сообщения ботом orderProcessing.ts',
					error
				)
			}
		}

		let messageId: number
		if (text === '/createorder') {
			userOrder.currentStep = 'startTime'
			userOrder.orderData.createdBy = telegramId
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

			const { templatesOrderInit, buttonsOrder } = formatOrderInfoMessageInit(
				userOrder.orderData
			)

			const message = await bot.sendMessage(
				chatId,
				`Новый заказ: ${templatesOrderInit}`,
				{
					...buttonsOrder,
					parse_mode: 'HTML',
				}
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
					const templatesOrderEnd = formatOrderInfoMessageEnd(newOrder)

					userOrder.orderData = {}
					// console.log(0, 'userOrders.size', userOrders.size)
					bot.sendMessage(chatId, 'Заказ записан в бд, и отправлен юзерам')
					bot.sendMessage(chatId, templatesOrderEnd, {
						parse_mode: 'HTML',
					})
				} catch (error) {
					userOrder.orderData = {}
					bot.sendMessage(chatId, 'Ошибка при сохранение заказа в БД')
				}
			}
		}
	}
}
