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
export let orderData: any = {}
let currentStep = ''
export async function handleOrderCreation(
	bot: TelegramBot,
	ordersService: OrdersService,
	data: IData
) {
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
		orderData.hourCost = Number(text)
		currentStep = null // Сброс состояния

		const { templatesOrderInit, buttonsOrder } =
			formatOrderInfoMessageInit(orderData)

		bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
			...buttonsOrder,
			parse_mode: 'HTML',
		})
	}

	if (text === 'send_order') {
		if (
			Object.keys(orderData).length === 0 &&
			orderData.constructor === Object
		) {
			bot.sendMessage(chatId, 'Заказ пуст')
			console.log('данные нет')
		} else {
			try {
				const newOrder = await ordersService.creatingOrder(orderData)
				const templatesOrderEnd = formatOrderInfoMessageEnd(newOrder)
				orderData = {}
				bot.sendMessage(chatId, 'Заказ записан в бд, и отправлен юзерам')
				bot.sendMessage(chatId, templatesOrderEnd, {
					parse_mode: 'HTML',
				})
			} catch (error) {
				console.log('Ошибка при сохранения заказ в бд')
				bot.sendMessage(chatId, 'Ошибка при сохранение заказа в БД')
			}
		}
	}
}

// let orderData = {};
// let currentStep = 'numExecutors';

// bot.on('message', async (msg) => {
//  const chatId = msg.chat.id;
//  const text = msg.text;

//  if (text === '/createOrder') {
// 	currentStep = 'numExecutors';
// 	orderData = {};
// 	bot.sendMessage(chatId, 'Введите количество грузчиков:');
//  } else if (currentStep === 'numExecutors') {
// 	orderData.numExecutors = text;
// 	currentStep = 'text';
// 	bot.sendMessage(chatId, 'Введите детали заказа:');
//  } else if (currentStep === 'text') {
// 	orderData.text = text;
// 	currentStep = 'address';
// 	bot.sendMessage(chatId, 'Введите адрес:');
//  } else if (currentStep === 'address') {
// 	orderData.address = text;
// 	currentStep = null; // Сброс состояния
// 	await saveOrderToDB(orderData); // Сохранение заказа в БД
// 	bot.sendMessage(chatId, 'Ваш заказ успешно сохранен!');
//  }
// });
