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

@Controller('orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly botService: BotService
	) {}

	@Post()
	async create(@Body() dto: CreateOrderDto) {
		return this.ordersService.create(dto)
	}
	@Post('add_order')
	async create2(@Body() dto: CreateOrderDto) {
		console.log(234, dto)

		const newOrder = this.ordersService.create(dto)

		await this.botService.sendMessage('721836748', 'все окей')
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
		return this.ordersService.removeExecutorFromOrder(orderId, executorId)
	}
}
