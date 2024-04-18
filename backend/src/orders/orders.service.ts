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

	async getPotentialExecutorIdOrder(orderId: string, executorId: string) {
		try {
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
				select: { potentialExecutors: true },
			})
			const getPotentialExecutorIdOrder =
				order.potentialExecutors.includes(executorId)

			return getPotentialExecutorIdOrder
		} catch (error) {
			console.log('getPotentialExecutorIdOrder', error)
			throw error
		}
	}

	async addPotentialExecutor(bot, data) {
		const { orderId, executorId } = data
		// console.log(1, 'orderId', typeof orderId)
		// console.log(2, 'executorId', typeof executorId)
		// Получаем текущий список потенциальных исполнителей
		const order = await this.db.order.findUnique({
			where: { id: Number(orderId) },
			select: { potentialExecutors: true },
		})

		console.log(1, 'addPotentialExecutor', order)
		if (!order) return
		// Проверяем, существует ли уже такой исполнитель в списке
		if (order.potentialExecutors.includes(executorId)) {
			console.log(
				'Исполнитель уже добавлен в список потенциальных исполнителей.'
			)
			bot.sendMessage(executorId, `Нет смысла жать повторно`)
			return
		}

		// Добавляем нового потенциального исполнителя
		await this.db.order.update({
			where: { id: Number(orderId) },
			data: {
				potentialExecutors: {
					set: [...order.potentialExecutors, executorId],
				},
			},
		})

		console.log(
			2,
			'Исполнитель успешно добавлен в список потенциальных исполнителей.'
		)
	}

	async assignUserToOrder(userId: string, orderId: string) {
		await this.db.orderExecutor.create({
			data: {
				userId: userId,
				orderId: Number(orderId),
			},
		})
	}
}
