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
			console.log(0, 'Ошибка в creatingOrder', error.message)
			throw error
		}
	}

	async gettingAllOrders() {
		try {
			const orders = await this.db.order.findMany()
			return orders
		} catch (error) {
			console.log(0, 'Ошибка в gettingAllOrders', error)
			throw error
		}
	}
	async gettingOrderById(orderId: string) {
		try {
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
			})
			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}
			return order
		} catch (error) {
			console.log(0, 'Ошибка в gettingOrderById', error.message)
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
			const order = await this.gettingOrderById(orderId)
			console.log(1, order.numExecutors)

			// Проверяем, есть ли еще места в заказе
			const existingExecutors = await this.db.orderExecutor.count({
				where: {
					orderId: Number(orderId),
				},
			})
			console.log(2, existingExecutors)

			if (existingExecutors >= order.numExecutors) {
				throw new Error(`В заказе № ${orderId} нет свободных мест.`)
			}

			// Проверяем, существует ли уже запись с такими orderId и userId
			const existingExecutor = await this.db.orderExecutor.findUnique({
				where: {
					orderId_userId: {
						orderId: Number(orderId),
						userId: userId,
					},
				},
			})

			// Если запись уже существует, выбрасываем ошибку или возвращаем сообщение
			if (existingExecutor) {
				throw new Error(
					`Грузчик № ${userId} уже назначен на заказ № ${orderId}`
				)
			}

			// Если запись не существует и есть свободные места, создаем новую
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
	// async assignUserToOrder(orderId: string, userId: string) {
	// 	const order = await this.gettingOrderById(orderId)
	// 	console.log(1, order.numExecutors)
	// 	try {
	// 		const existingExecutor = await this.db.orderExecutor.findUnique({
	// 			where: {
	// 				orderId_userId: {
	// 					orderId: Number(orderId),
	// 					userId: userId,
	// 				},
	// 			},
	// 		})
	// 		console.log(2, existingExecutor)

	// 		if (existingExecutor) {
	// 			throw new Error(
	// 				`Грузчик № ${userId} уже назначен на заказ № ${orderId}`
	// 			)
	// 		}

	// 		await this.db.orderExecutor.create({
	// 			data: {
	// 				orderId: Number(orderId),
	// 				userId: userId,
	// 			},
	// 		})

	// 		return { msg: `Грузчик № ${userId} был добавлен на заказ № ${orderId} .` }
	// 	} catch (error) {
	// 		console.log('assignUserToOrder error.message', error.message)
	// 		throw error
	// 	}
	// }
}

// const order = {
// 	// Ваши данные заказа
// 	numExecutors: 2,
// 	executors: ['executor1', 'executor2', 'executor3'], // Предположим, что это массив исполнителей
// }

// if (order.executors.length > order.numExecutors) {
// 	throw new Error('Количество исполнителей не может превышать numExecutors')
// }
