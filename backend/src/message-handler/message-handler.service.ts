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
}
