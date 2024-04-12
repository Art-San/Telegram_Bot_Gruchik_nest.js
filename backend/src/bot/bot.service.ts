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

interface OrderData {
	createdBy?: string
	numExecutors?: number
	text?: string
	address?: string
}

@Injectable()
export class BotService implements OnModuleInit {
	constructor(
		private readonly db: DbService,
		private readonly userService: UserService
	) {}

	async onModuleInit() {
		await this.botMessage()
	}

	async botMessage() {
		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		setBotCommands(bot)

		let orderData: OrderData = {}
		let currentStep = ''

		bot.on('message', async (ctx) => {
			const text = ctx.text
			const telegramId = String(ctx.from.id)
			const chatId = String(ctx.chat.id)
			const userName = ctx.from.username
				? `@${ctx.from.username}`
				: `${ctx.from.first_name} ${ctx.from.last_name}`

			if (text === '/createorder') {
				currentStep = 'numExecutors'
				orderData.createdBy = telegramId
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
				currentStep = null // Сброс состояния
				// await saveOrderToDB(orderData); // Сохранение заказа в БД
				bot.sendMessage(chatId, 'Ваш заказ успешно сохранен!')
			}
			// if (text === '/createorder') {
			// 	currentStep = 'numExecutors'
			// 	orderData.createdBy = telegramId
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
			// 	currentStep = null // Сброс состояния
			// 	// await saveOrderToDB(orderData); // Сохранение заказа в БД
			// 	bot.sendMessage(chatId, 'Ваш заказ успешно сохранен!')
			// }
			console.log(1, orderData)
			console.log(2, currentStep)

			if (text === '/start') {
				try {
					const response = await commandStart(
						telegramId,
						userName,
						this.userService
					)
					bot.sendMessage(chatId, response.msg)
				} catch (error) {
					console.error('Ошибка при обработке команды /start:', error)
					bot.sendMessage(
						chatId,
						'Произошла ошибка при обработке команды /start.'
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
