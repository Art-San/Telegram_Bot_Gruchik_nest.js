import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import {
	getButtonAssignOrder,
	getButtonRequestAppointment,
} from './utils/buttons'
import * as TelegramBot from 'node-telegram-bot-api'
import { BotCommandsService } from 'src/bot/bot-commands.service'
import { formatUserOrderInfoMessage } from 'src/bot/templates/user.templates'
import { formatOrderInfoMessageFinish } from 'src/bot/templates/order.templates'
// import { getUserInfoMessage, commandEnd } from './commands';

interface IData {
	chatId: string
	orderId: string
	authorId: string
	telegramId: string
	executorId: string
}
@Injectable()
export class MessageHandlerService {
	constructor(
		private readonly userService: UserService,
		private readonly ordersService: OrdersService,
		private readonly botCommandsService: BotCommandsService
	) {}

	// async handleMessage(text: string, telegramId: number, chatId: number) {
	// 	console.log(0, 'handleMessage')
	// }

	async sendingMessageOrdersUsers(id: string) {
		try {
			const users = await this.userService.getActiveUsersExceptTheAuthor(id)
			const usersTelegramId = users.map((user) => user.telegramId)
			return usersTelegramId
			// console.log(11, 'users', users)
		} catch (error) {
			console.log(
				0,
				'Ошибка в MessageHandlerService sendingMessageOrdersUsers',
				error
			)
			throw error.message
		}
	}

	async firstMessageAuthorExecutor(
		bot: TelegramBot,
		data: IData
		// chatId: string, orderId: string, authorId: string, executorId: string
	) {
		const { chatId, orderId, authorId, telegramId, executorId } = data
		try {
			const user = await this.userService.getUserByTelegramId(executorId)

			const { isExecutorIdPresent, order } =
				await this.ordersService.getPotentialExecutorIdOrder(
					orderId,
					executorId
				)

			if (user && !isExecutorIdPresent) {
				await this.ordersService.addPotentialExecutor(bot, {
					orderId,
					executorId,
				})

				const opts = getButtonAssignOrder(orderId, executorId)
				const response = formatUserOrderInfoMessage(user, order)
				// const response =
				// 	await this.botCommandsService.getUserInfoMessage(telegramId)
				await bot.sendMessage(authorId, response, opts)
			}

			bot.sendMessage(chatId, 'Ожидайте несколько минут.')
		} catch (error) {
			console.error('Ошибка при обработке запроса на заказ:', error.message)
			bot.sendMessage(chatId, 'Произошла ошибка при обработке вашего запроса.')
		}
	}

	async secondMessageAuthorExecutor(
		bot: TelegramBot,
		chatId: string,
		orderId: string,
		idExecutor: string
	) {
		try {
			const { order, userId } = await this.ordersService.assignUserToOrder(
				orderId,
				idExecutor
			)

			const user = await this.userService.getUserByTelegramId(userId)

			const templatesOrderEnd = formatOrderInfoMessageFinish(order, user)

			await bot.sendMessage(chatId, templatesOrderEnd, { parse_mode: 'HTML' })

			const opts = getButtonRequestAppointment(orderId, user.telegramId)
			bot.sendMessage(idExecutor, `Вы назначены на заказ № ${orderId}`, opts)
			// bot.sendMessage(idExecutor, `Вы назначены на заказ № ${orderId}`, opts)
		} catch (error) {
			// console.log(
			// 	0,
			// 	'secondMessageAuthorExecutor добавление юзера к заказу',
			// 	error.message
			// )
			bot.sendMessage(chatId, error.message)
		}
	}

	async finishMessageExecutor(
		bot: TelegramBot,
		chatId: string,
		orderId: string,
		idExecutor: string
		// chatId: string, orderId: string, authorId: string, executorId: string
	) {
		try {
			// bot.sendMessage(chatId, 'Ожидайте несколько минут.')
		} catch (error) {
			console.error('Ошибка при обработке запроса на заказ:', error.message)
			bot.sendMessage(chatId, 'Произошла ошибка при обработке вашего запроса.')
		}
	}
}
