import * as TelegramBot from 'node-telegram-bot-api'
import { IOrderData } from 'src/orders/dto/order.dto'
import { formatOrderInfoMessage } from './templates/order.templates'

interface IData {
	text: string
	telegramId?: string
	chatId: string
}
export let orderData: IOrderData = {}
let currentStep = ''
export async function handleOrderCreation(bot: TelegramBot, data: IData) {
	const { text, telegramId, chatId } = data

	if (text === '/createorder') {
		currentStep = 'startTime'
		orderData.createdBy = telegramId
		bot.sendMessage(chatId, 'Введите время начала заказа:')
	} else if (currentStep === 'startTime') {
		orderData.startTime = text
		currentStep = 'numExecutors'
		bot.sendMessage(chatId, 'Введите количество грузчиков:')
	} else if (currentStep === 'numExecutors') {
		orderData.numExecutors = Number(text)
		currentStep = 'text'
		bot.sendMessage(chatId, 'Введите детали заказа:')
	} else if (currentStep === 'text') {
		orderData.text = text
		currentStep = 'address'
		bot.sendMessage(chatId, 'Введите адрес:')
	} else if (currentStep === 'address') {
		orderData.address = text
		currentStep = 'hourCost'
		bot.sendMessage(chatId, 'Введите стоимость час:')
	} else if (currentStep === 'hourCost') {
		orderData.hourCost = text
		currentStep = null // Сброс состояния

		const { templatesOrderInit, buttonsOrder } =
			formatOrderInfoMessage(orderData)

		bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
			...buttonsOrder,
			parse_mode: 'HTML',
		})
	}
}
