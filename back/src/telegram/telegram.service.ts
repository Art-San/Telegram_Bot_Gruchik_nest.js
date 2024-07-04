import { Injectable } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { Telegram } from './telegram.interface'
import { getTelegramConfig } from 'src/config/telegram.config'

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

	async sendMessage(
		msg: string,
		options?: any,
		chatId: string = this.options.chatId
	) {
		await this.bot.sendMessage(chatId, msg, {
			parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
			...options,
		})
	}
	async sendPhoto(
		photo: string,
		msg?: string,
		chatId: string = this.options.chatId
	) {
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
}
