// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
// import { Prisma, PrismaClient, User } from '@prisma/client'
// import { DbService } from 'src/db/db.service'
// import TelegramBot = require('node-telegram-bot-api')
// import { setBotCommandsUser } from './commands/setBotCommands'
// // src/
// // |-- bot/
// // |   |-- bot.module.ts
// // |   |-- bot.service.ts
// // |   |-- bot.controller.ts (если используется)
// // |   |-- commands/
// // |       |-- setBotCommands.ts
// // |-- app.module.ts
// // |-- main.ts

// @Injectable()
// export class BotService implements OnModuleInit {
// 	constructor(private readonly db: DbService) {}
// 	async onModuleInit() {
// 		await this.botMessage()
// 	}

// 	async botMessage() {
// 		const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 			polling: true,
// 		})

// 		setBotCommandsUser(bot)

// 		bot.on('message', async (ctx) => {
// 			const text = ctx.text
// 			console.log(1, text)
// 			const chatId = String(ctx.chat.id)
// 			const firstName = ctx.chat.first_name

// 			if (text === '/start') {
// 				return bot.sendMessage(chatId, `Добро пожаловать в наш бот:`)
// 			}
// 		})
// 	}
// }

import { Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	setBotCommandsUser,
	setBotCommandsAdmin,
	commandStart,
} from './commands/setBotCommands'

import { DbService } from 'src/db/db.service'
import { UserService } from 'src/user/users.service'

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

		bot.on('message', async (ctx) => {
			const text = ctx.text
			const telegramId = String(ctx.from.id)
			const chatId = String(ctx.chat.id)
			const userName = ctx.from.username
				? `@${ctx.from.username}`
				: `${ctx.from.first_name} ${ctx.from.last_name}`

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
						'Произошла ошибка при обработке вашего запроса.'
					)
				}
			}
		})
	}
}
