import * as TelegramBot from 'node-telegram-bot-api'
import { IOrderData } from 'src/orders/dto/order.dto'
import {
	formatOrderInfoMessageEnd,
	formatOrderInfoMessageInit,
} from './templates/order.templates'
import { OrdersService } from 'src/orders/orders.service'

// const ordersService = new OrdersService()

interface IData {
	text: string
	telegramId?: string
	chatId: string
}

// Используйте Map для хранения данных о заказе и текущем шаге для каждого пользователя
const userOrders = new Map<string, { orderData: any; currentStep: string }>()

export async function handleOrderCreation(
	bot: TelegramBot,
	ordersService: OrdersService,
	data: IData
) {
	const { text, telegramId, chatId } = data

	// Получаем данные о заказе и текущий шаг для данного пользователя
	let userOrder = userOrders.get(chatId)
	if (!userOrder) {
		userOrder = { orderData: {}, currentStep: '' }
		userOrders.set(chatId, userOrder)
	}

	if (text === '/createorder') {
		userOrder.currentStep = 'startTime'
		userOrder.orderData.createdBy = telegramId
		bot.sendMessage(chatId, 'Введите время начала заказа:')
	} else if (userOrder.currentStep === 'startTime') {
		userOrder.orderData.startTime = text
		userOrder.currentStep = 'numExecutors'
		bot.sendMessage(chatId, 'Введите количество грузчиков:')
	} else if (userOrder.currentStep === 'numExecutors') {
		userOrder.orderData.numExecutors = Number(text)
		userOrder.currentStep = 'text'
		bot.sendMessage(chatId, 'Введите детали заказа:')
	} else if (userOrder.currentStep === 'text') {
		userOrder.orderData.text = text
		userOrder.currentStep = 'address'
		bot.sendMessage(chatId, 'Введите адрес:')
	} else if (userOrder.currentStep === 'address') {
		userOrder.orderData.address = text
		userOrder.currentStep = 'hourCost'
		bot.sendMessage(chatId, 'Введите стоимость час:')
	} else if (userOrder.currentStep === 'hourCost') {
		userOrder.orderData.hourCost = Number(text)
		userOrder.currentStep = '' // Сброс состояния

		const { templatesOrderInit, buttonsOrder } = formatOrderInfoMessageInit(
			userOrder.orderData
		)

		bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
			...buttonsOrder,
			parse_mode: 'HTML',
		})
	}

	if (text === 'send_order') {
		if (
			Object.keys(userOrder.orderData).length === 0 &&
			userOrder.orderData.constructor === Object
		) {
			throw new Error('Заказ пуст')
		} else {
			try {
				const newOrder = await ordersService.creatingOrder(userOrder.orderData)
				const templatesOrderEnd = formatOrderInfoMessageEnd(newOrder)

				userOrder.orderData = {}
				console.log(0, 'userOrders.size', userOrders.size)
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
