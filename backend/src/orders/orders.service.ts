import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { CreateOrderDto, IOrderData } from './dto/order.dto'

@Injectable()
export class OrdersService {
	constructor(private readonly db: DbService) {}

	async creatingOrder(orderData: CreateOrderDto) {
		try {
			const newOrder = await this.db.order.create({
				data: orderData,
			})

			return newOrder
		} catch (error) {
			console.log('Ошибка в creatingOrder', error.message)
			throw error
		}
	}

	async gettingAllOrders() {
		try {
			const orders = await this.db.order.findMany()
			return orders
		} catch (error) {
			console.log('Ошибка в getAllUsers', error)
			throw error
		}
	}
}
