import { Injectable, NotFoundException } from '@nestjs/common'
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
			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}
			const getPotentialExecutorIdOrder =
				order.potentialExecutors.includes(executorId)

			return getPotentialExecutorIdOrder
		} catch (error) {
			console.log(0, 'getPotentialExecutorIdOrder', error.message)
			throw error.message
		}
	}

	async addPotentialExecutor(bot, data) {
		const { orderId, executorId } = data
		try {
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
				select: { potentialExecutors: true },
			})

			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}
			if (order.potentialExecutors.includes(executorId)) {
				bot.sendMessage(executorId, `Нет смысла жать повторно`)
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
		} catch (error) {
			console.log(1, error.message)
			throw error.message
		}
	}

	async assignUserToOrder(orderId: string, userId: string) {
		try {
			const existingExecutor = await this.db.orderExecutor.findUnique({
				where: {
					orderId_userId: {
						orderId: Number(orderId),
						userId: userId,
					},
				},
			})

			if (existingExecutor) {
				throw new Error(
					`Грузчик № ${userId} уже назначен на заказ № ${orderId}`
				)
			}

			await this.db.orderExecutor.create({
				data: {
					orderId: Number(orderId),
					userId: userId,
				},
			})

			return { msg: `Грузчик № ${userId} был добавлен на заказ № ${orderId} .` }
		} catch (error) {
			console.log('assignUserToOrder error.message', error.message)
			throw error
		}
	}
}
