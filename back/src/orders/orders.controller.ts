import { Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get()
	async getAll() {
		const res = await this.ordersService.findAllOrders()
		// console.log(11, res)
		return res
	}

	@Get(':orderId')
	async getOrder(@Param('orderId') orderId: string) {
		return this.ordersService.findByOrderId(orderId)
	}

	@Delete(':orderId')
	async delete(@Param('orderId') orderId: string) {
		return { msg: '1234', orderId }
	}

	@Post(':orderId/remove-executor/:executorId')
	async removeExecutor(
		@Param('orderId') orderId: string,
		@Param('executorId') executorId: string
	) {
		console.log(12, '@Controller(orders) ', orderId)
		console.log(12, '@Controller(orders) ', executorId)
		return this.ordersService.removeExecutorFromOrder(orderId, executorId)
	}
}

// `api/orders/${orderId}/remove-executor/${executorId}`
