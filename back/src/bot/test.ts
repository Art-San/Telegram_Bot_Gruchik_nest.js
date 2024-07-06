// import { Injectable, OnModuleInit } from '@nestjs/common'
// import * as TelegramBot from 'node-telegram-bot-api'
// import {
// 	extractInfoCallbackQueryCTX,
// 	getUserDetailsFromTelegramContext,
// } from './utils/context-helpers'

// import { BotCommandsService } from './bot-commands.service'
// import { OrderProcessingService } from 'src/orders/order-processing.service'
// import { MessageHandlerService } from 'src/message-handler/message-handler.service'
// import { Telegram } from 'src/telegram/telegram.interface'

// @Injectable()
// export class BotService implements OnModuleInit {
// 	bot: TelegramBot
// 	options: Telegram
// 	constructor(
// 		private readonly botCommandsService: BotCommandsService,
// 		private readonly orderProcessingService: OrderProcessingService,
// 		private readonly messageHandlerService: MessageHandlerService
// 	) {
// 		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 			polling: true,
// 		})
// 	}

// 	async sendMessage(chatId: string, msg: string, options?: any) {
// 		await this.bot.sendMessage(chatId, msg, {
// 			parse_mode: 'HTML',
// 			...options,
// 		})
// 	}

// 	async onModuleInit() {
// 		const webAppUrl = process.env.NGROK_URL

// 		this.botCommandsService.setBotCommands(this.bot)

// 		this.bot.on('callback_query', async (ctx) => {
// 			const { data, telegramId, chatId, executorId } =
// 				extractInfoCallbackQueryCTX(ctx)
// 		})

// 		this.bot.on('message', async (ctx) => {
// 			const {
// 				text,
// 				telegramId,
// 				chatId,
// 				userName,
// 				firstLastName,
// 				nameButton,
// 				dataButton,
// 			} = getUserDetailsFromTelegramContext(ctx)

// 			const photoUrl1 = './uploads/userName.jpg'
// 			if (text === '/start') {
// 		console.log('start')
// 			}

// 			if (text === '/info') {
//         console.log('info')
// 			}
// 		})

// 		this.bot.on('polling_error', (err) =>
// 			console.log('polling_error', err.message)
// 		)
// 	}
// }

// import {
// 	Body,
// 	Controller,

// 	Post,
// } from '@nestjs/common'
// import { OrdersService } from './orders.service'
// import { CreateOrderDto } from './dto/order.dto'
// import { BotService } from 'src/bot/bot.service'
// import { MessageHandlerService } from 'src/message-handler/message-handler.service'
// import { sendsOutToUsers } from './utils/user-message-sender_1'

// @Controller('orders')
// export class OrdersController {
// 	constructor(
// 		private readonly ordersService: OrdersService,
// 		private readonly botService: BotService,
// 		private readonly messageHandlerService: MessageHandlerService
// 	) {}

// 	@Post('add_order')
// 	async create2(@Body() dto: CreateOrderDto) {

// 		const newOrder = await this.ordersService.create(dto)

// 		const usersTelegramId =
// 			await this.messageHandlerService.sendingMessageOrdersUsers(
// 				newOrder.authorId
// 			)

// 			await sendsOutToUsers(bot, usersTelegramId, newOrder)
// 		return newOrder
// 	}

// }

// import TelegramBot from 'node-telegram-bot-api'
// import { formatOrderInfoMessageEnd } from 'src/bot/templates/order.templates'
// import { IOrderData } from '../dto/order.dto'
// import { getButtonRequestOrder } from 'src/message-handler/utils/buttons'

// export async function sendsOutToUsers(
// 	bot: TelegramBot,
// 	usersId: String[],
// 	order: IOrderData
// ) {
// 	const templatesOrderEnd = formatOrderInfoMessageEnd(order)
// 	usersId.forEach((id) => {
// 		const opts = getButtonRequestOrder(String(order.id), order.authorId)

// 		bot.sendMessage(Number(id), templatesOrderEnd, opts)
// 	})
// }
