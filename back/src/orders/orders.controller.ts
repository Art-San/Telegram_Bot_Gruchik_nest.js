import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/order.dto'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async create(@Body() dto: CreateOrderDto) {
		return this.ordersService.create(dto)
	}
	@Get()
	async getAll() {
		const res = await this.ordersService.findAllOrders()
		// console.log(12, res)
		return res
	}

	@Get(':orderId')
	async getOrder(@Param('orderId') orderId: string) {
		console.log(12, orderId)
		return this.ordersService.findByOrderId(orderId)
	}

	@Delete(':orderId')
	async delete(@Param('orderId') orderId: string) {
		return { msg: '1234', orderId }
	}

	@Delete(':orderId/remove-executor/:executorId')
	async removeExecutor(
		@Param('orderId') orderId: string,
		@Param('executorId') executorId: string
	) {
		return this.ordersService.removeExecutorFromOrder(orderId, executorId)
	}
}

// `api/orders/${orderId}/remove-executor/${executorId}`
