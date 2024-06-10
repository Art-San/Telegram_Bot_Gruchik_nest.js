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

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async create(@Body() dto: CreateOrderDto) {
		return this.ordersService.create(dto)
	}

	@Get()
	async getAll() {
		const res = await this.ordersService.findAll()
		return res
	}

	@Get('pagination')
	async getOPagination(
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10
	) {
		const res = await this.ordersService.findPagination(+page, +pageSize)
		console.log(123, res)
		return res
	}

	@Get(':orderId')
	async getOrder(@Param('orderId') orderId: string) {
		// console.log(12, orderId)
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

// `api/orders/${orderId}/remove-executor/${executorId}`
// http://localhost:3001/api/orders?page=1&pageSize=10
// export const getOrderUrl = (string: string) => `/orders${string}`
// async getAllOrders() {
// 	return axiosClassic.get<IOrder[]>(getOrderUrl(``), {
// 		params: {}
// 	})
// },
