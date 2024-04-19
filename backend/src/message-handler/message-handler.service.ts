import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
// import { getUserInfoMessage, commandEnd } from './commands';

@Injectable()
export class MessageHandlerService {
	constructor(
		private readonly userService: UserService,
		private readonly ordersService: OrdersService
	) {}

	async handleMessage(text: string, telegramId: number, chatId: number) {
		console.log(0, 'handleMessage')
	}

	async sendingMessageOrdersUsers(id: string) {
		try {
			const users = await this.userService.getAllUsersExceptTheAuthor(id)
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

	// messageAuthorExecutor
	async finalMessageAuthorExecutor(orderId: string, idExecutor: string) {}
}
