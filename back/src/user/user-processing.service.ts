// import { Injectable } from '@nestjs/common'
// import * as TelegramBot from 'node-telegram-bot-api'
// import { BotCommandsService } from 'src/bot/bot-commands.service'

// interface IData {
// 	text: string
// 	telegramId: string
// 	chatId: string
// 	userName: string
// }

// @Injectable()
// export class UserProcessingService {
// 	constructor(private botCommandsService: BotCommandsService) {}

// 	async handleUserCreation(bot: TelegramBot, data: IData) {
// 		const { text, telegramId, chatId, userName } = data

// 		if (text === '/start') {
// 			try {
// 				const response = await this.botCommandsService.commandStart(
// 					telegramId,
// 					userName
// 				)
// 				bot.sendMessage(chatId, response.msg)
// 			} catch (error) {
// 				console.error('Ошибка при обработке команды /start:', error.message)
// 				bot.sendMessage(
// 					chatId,
// 					'Произошла ошибка при обработке команды /start.'
// 				)
// 			}
// 		}
// 	}
// }
