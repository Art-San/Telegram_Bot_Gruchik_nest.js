import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'

const newOrder = {
	createdBy: '23456',
	numExecutors: 2, // Убедитесь, что тип данных соответствует вашей схеме в Prisma
	text: `const Фeйк заявка`,
	address: 'кирова',
}

@Injectable()
export class OrdersService {
	constructor(private readonly db: DbService) {}

	async createOrder() {
		try {
			const createdOrder = await this.db.order.create({
				data: newOrder,
			})

			return createdOrder
		} catch (error) {
			console.log('Ошибка в createOrder', error)
			return error
		}
	}
}
