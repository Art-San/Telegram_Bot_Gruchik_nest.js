import { Controller, Delete, Get, Param } from '@nestjs/common'
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
}
