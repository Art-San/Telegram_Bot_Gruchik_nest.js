import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { Telegram } from './telegram.interface'
import { getTelegramConfig } from 'src/config/telegram.config'
import { getUserDetailsFromTelegramContext } from 'src/bot/utils/context-helpers'

@Injectable()
export class TelegramService {
	bot: TelegramBot
	options: Telegram

	constructor() {
		this.options = getTelegramConfig()
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
	}

	async sendMessage(chatId: string, msg: string, options?: any) {
		await this.bot.sendMessage(chatId, msg, {
			parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
			...options,
		})
	}
	async sendPhoto(chatId: string, photo: string, msg?: string) {
		await this.bot.sendPhoto(
			chatId,
			photo,
			msg
				? {
						caption: msg,
					}
				: {}
		)
	}

	async botOn() {
		await this.bot.on('message', async (ctx) => {
			const {
				text,
				telegramId,
				chatId,
				userName,
				firstLastName,
				nameButton,
				dataButton,
			} = getUserDetailsFromTelegramContext(ctx)

			if (text === '/start') {
				this.sendMessage(chatId, 'start')
			}
		})
	}
}

// @Injectable()
// export class BotService implements OnModuleInit {
// 	// bot: TelegramBot
// 	// options: Telegram

// 	constructor(
// 		private readonly botCommandsService: BotCommandsService,
// 		private readonly orderProcessingService: OrderProcessingService,
// 		private readonly userService: UserService,
// 		private readonly ordersService: OrdersService,
// 		private readonly messageHandlerService: MessageHandlerService
// 	) {
// 		// this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 		// 	polling: true,
// 		// })
// 	}

// 	// async sendMessage(
// 	// 	msg: string,
// 	// 	options?:string,
// 	// 	chatId: string = this.options.chatId
// 	// ) {
// 	// 	await this.bot.telegram.sendMessage(chatId, msg, {
// 	// 		parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
// 	// 		...options,
// 	// 	})
// 	// }
