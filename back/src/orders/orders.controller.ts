import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/order.dto'
import { BotService } from 'src/bot/bot.service'
import { MessageHandlerService } from 'src/message-handler/message-handler.service'
import { sendsOutToUsers } from './utils/user-message-sender_1'

@Controller('orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly botService: BotService,
		private readonly messageHandlerService: MessageHandlerService
	) {}

	@Post()
	async create(@Body() dto: CreateOrderDto) {
		return this.ordersService.create(dto)
	}
	@Post('add_order')
	async create2(@Body() dto: CreateOrderDto) {
		const newOrder = await this.ordersService.create(dto)

		const usersTelegramId =
			await this.messageHandlerService.sendingMessageOrdersUsers(
				newOrder.authorId
			)
		await sendsOutToUsers(this.botService.bot, usersTelegramId, newOrder)

		return newOrder
	}

	// @Get()
	// async getAll() {
	// 	const res = await this.ordersService.findAllOrders()
	// 	return res
	// }

	// @Get()
	// async getAllCreated() {
	// 	const res = await this.ordersService.findAllOrders()
	// 	return res
	// }

	// getOrdersByStatus
	@Get()
	async getTodayYesterdaySevenDay(
		@Query('days') days: string = 'last7Days', // 'today', // 'yesterday' // 'last7Days' // last30Days
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10
	) {
		const res = await this.ordersService.findTodayYesterdaySevenDay(
			days,
			+page,
			+pageSize
		)

		return res
	}

	@Get('pagination')
	async getOPagination(
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10
	) {
		const res = await this.ordersService.findPagination(+page, +pageSize)
		return res
	}

	@Get(':orderId')
	async getOrder(@Param('orderId') orderId: string) {
		return this.ordersService.findByOrderId(orderId)
	}
	@Delete(':orderId')
	async delete(@Param('orderId') orderId: string) {
		return this.ordersService.delete(orderId)
	}

	@Delete(':orderId/remove-executor/:executorId')
	async removeExecutor(
		@Param('orderId') orderId: string,
		@Param('executorId') executorId: string
	) {
		console.log(1, 'orderId', orderId)
		console.log(1, 'executorId', executorId)
		return this.ordersService.removeExecutorFromOrder(orderId, executorId)
	}
}
