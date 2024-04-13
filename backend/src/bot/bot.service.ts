import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	setBotCommands,
	commandStart,
	commandEnd,
	getUserInfoMessage,
} from './commands/setBotCommands'

import { DbService } from 'src/db/db.service'
import { UserService } from 'src/user/users.service'
import { IOrderData } from 'src/orders/dto/order.dto'
import { createOrder } from './commands/setBotCommandsOrder'
import { OrdersService } from 'src/orders/orders.service'
import { formatOrderInfoMessage } from './templates/order.templates'
import { handleOrderCreation } from './orderProcessing'
import { handleUserCreation } from './userProcessing'

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

		bot.on('callback_query', async (msg) => {
			// console.log(0, msg.data)
			const data = msg.data
			const chatId = String(msg.message.chat.id)
		})

		bot.on('message', async (ctx) => {
			const text = ctx.text
			const telegramId = String(ctx.from.id)
			const chatId = String(ctx.chat.id)
			const userName = ctx.from.username
				? `@${ctx.from.username}`
				: `${ctx.from.first_name} ${ctx.from.last_name}`

			await handleUserCreation(ctx, bot, this.userService)

			await handleOrderCreation(ctx, bot)
			// if (text === '/createorder') {
			// 	currentStep = 'startTime'
			// 	orderData.createdBy = telegramId
			// 	bot.sendMessage(chatId, 'Введите время начала заказа:')
			// } else if (currentStep === 'startTime') {
			// 	orderData.startTime = text
			// 	currentStep = 'numExecutors'
			// 	bot.sendMessage(chatId, 'Введите количество грузчиков:')
			// } else if (currentStep === 'numExecutors') {
			// 	orderData.numExecutors = Number(text)
			// 	currentStep = 'text'
			// 	bot.sendMessage(chatId, 'Введите детали заказа:')
			// } else if (currentStep === 'text') {
			// 	orderData.text = text
			// 	currentStep = 'address'
			// 	bot.sendMessage(chatId, 'Введите адрес:')
			// } else if (currentStep === 'address') {
			// 	orderData.address = text
			// 	currentStep = 'hourCost'
			// 	bot.sendMessage(chatId, 'Введите стоимость час:')
			// } else if (currentStep === 'hourCost') {
			// 	orderData.hourCost = text
			// 	currentStep = null // Сброс состояния

			// 	const { templatesOrderInit, buttonsOrder } =
			// 		formatOrderInfoMessage(orderData)

			// 	bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
			// 		...buttonsOrder,
			// 		parse_mode: 'HTML',
			// 	})
			// }

			// console.log(0, ctx)

			// if (text === '/start') {
			// 	try {
			// 		const response = await commandStart(
			// 			telegramId,
			// 			userName,
			// 			this.userService
			// 		)
			// 		bot.sendMessage(chatId, response.msg)
			// 	} catch (error) {
			// 		console.error('Ошибка при обработке команды /start:', error)
			// 		bot.sendMessage(
			// 			chatId,
			// 			'Произошла ошибка при обработке команды /start.'
			// 		)
			// 	}
			// }

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
// const TelegramBot = require('node-telegram-bot-api');
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

// Предполагаем, что у вас есть функция для сохранения заказа в БД
// const saveOrderToDB = async (orderData) => {

// };

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

// bot.on('message', async (ctx) => {
// 	const text = ctx.text
// 	const telegramId = String(ctx.from.id)
// 	const chatId = String(ctx.chat.id)
// 	const userName = ctx.from.username
// 		? `@${ctx.from.username}`
// 		: `${ctx.from.first_name} ${ctx.from.last_name}`

// 	if (text === '/createorder') {
// 		currentStep = 'startTime'
// 		orderData.createdBy = telegramId
// 		bot.sendMessage(chatId, 'Введите время начала заказа:')
// 	} else if (currentStep === 'startTime') {
// 		orderData.startTime = text
// 		currentStep = 'numExecutors'
// 		bot.sendMessage(chatId, 'Введите количество грузчиков:')
// 	} else if (currentStep === 'numExecutors') {
// 		orderData.numExecutors = Number(text)
// 		currentStep = 'text'
// 		bot.sendMessage(chatId, 'Введите детали заказа:')
// 	} else if (currentStep === 'text') {
// 		orderData.text = text
// 		currentStep = 'address'
// 		bot.sendMessage(chatId, 'Введите адрес:')
// 	} else if (currentStep === 'address') {
// 		orderData.address = text
// 		currentStep = 'hourCost'
// 		bot.sendMessage(chatId, 'Введите стоимость час:')
// 	} else if (currentStep === 'hourCost') {
// 		orderData.hourCost = text
// 		currentStep = null // Сброс состояния

// 		const { templatesOrderInit, buttonsOrder } =
// 			formatOrderInfoMessage(orderData)

// 		bot.sendMessage(chatId, `Новый заказ: ${templatesOrderInit}`, {
// 			...buttonsOrder,
// 			parse_mode: 'HTML',
// 		})
// 	}

// 	console.log(0, ctx)

// 	if (text === '/start') {
// 		try {
// 			const response = await commandStart(
// 				telegramId,
// 				userName,
// 				this.userService
// 			)
// 			bot.sendMessage(chatId, response.msg)
// 		} catch (error) {
// 			console.error('Ошибка при обработке команды /start:', error)
// 			bot.sendMessage(
// 				chatId,
// 				'Произошла ошибка при обработке команды /start.'
// 			)
// 		}
// 	}

// })
