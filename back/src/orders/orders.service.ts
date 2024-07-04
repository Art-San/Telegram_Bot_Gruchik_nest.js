import { Injectable, NotFoundException } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import {
	CreateOrderDto,
	IOrder,
	IOrderData,
	IPaginationResult,
} from './dto/order.dto'
import { OrderStatus, statusMap } from './enum/order-status.enum'

@Injectable()
export class OrdersService {
	constructor(private readonly db: DbService) {}

	async create(orderData: CreateOrderDto) {
		console.log(234, 'OrdersService', orderData)
		try {
			const newOrder = await this.db.order.create({
				data: orderData,
			})

			return newOrder
		} catch (error) {
			throw error.message
		}
	}

	async delete(orderId: string) {
		try {
			await this.db.$transaction([
				this.db.orderExecutor.deleteMany({
					where: {
						orderId: +orderId,
					},
				}),
				this.db.order.delete({
					where: {
						id: +orderId,
					},
				}),
			])
			return true
		} catch (error) {
			console.error(
				'Ошибка удаления заказа и связанных с ним исполнителей:',
				error
			)
			throw error
		}
	}

	async findTodayYesterdaySevenDay(
		days: string,
		page: number,
		pageSize: number
	) {
		try {
			const offset = (page - 1) * pageSize

			const today = new Date()
			today.setHours(0, 0, 0, 0)
			const yesterday = new Date(today)
			yesterday.setDate(today.getDate() - 1)
			const sevenDaysAgo = new Date(today)
			sevenDaysAgo.setDate(today.getDate() - 7)
			const thirtyDaysAgo = new Date(today)
			thirtyDaysAgo.setDate(today.getDate() - 30)

			let dateCondition: any
			switch (days) {
				case 'today':
					dateCondition = {
						gte: today,
					}
					break
				case 'yesterday':
					dateCondition = {
						gte: yesterday,
						lt: today,
					}
					break
				case 'last7Days':
					dateCondition = {
						gte: sevenDaysAgo,
					}
					break
				case 'last30Days':
					dateCondition = {
						gte: thirtyDaysAgo,
					}
					break
				default:
					throw new Error('Invalid days value')
			}

			const ordersWithCounts = await this.db.order.findMany({
				where: {
					createdAt: dateCondition,
				},
				include: {
					potentialExecutors: {
						select: {
							user: {
								select: {
									id: true,
									telegramId: true,
								},
							},
						},
					},
					executors: {
						select: {
							user: {
								select: {
									id: true,
									telegramId: true,
									userName: true,
								},
							},
						},
					},
				},
				skip: offset,
				take: pageSize,
				orderBy: {
					createdAt: 'desc',
				},
			})

			const transformedOrders = ordersWithCounts.map((order) => ({
				...order,
				executorsCount: order.executors.length,
				createdAt: order.createdAt.toISOString(),
				updatedAt: order.updatedAt.toISOString(),
			}))

			const totalOrdersCount = await this.db.order.count({
				where: {
					createdAt: dateCondition,
				},
			})

			return {
				data: transformedOrders,
				totalPages: Math.ceil(totalOrdersCount / pageSize),
			}
		} catch (error) {
			console.log('Ошибка в findTodayYesterdaySevenDay', error.message)
			throw new Error(error.message)
		}
	}
	// async findAll() {
	// 	try {
	// 		const orders = await this.db.order.findMany({
	// 			orderBy: {
	// 				createdAt: 'desc',
	// 			},
	// 		})
	// 		return orders
	// 	} catch (error) {
	// 		console.log(0, 'Ошибка в findAllOrders', error.message)
	// 		throw new Error('Ошибка в findAllOrders: ' + error.message)
	// 	}
	// }

	// async findTodayYesterdaySevenDay(
	// 	days: string,
	// 	page: number,
	// 	pageSize: number
	// ) {
	// 	try {
	// 		const offset = (page - 1) * pageSize

	// 		const today = new Date()
	// 		today.setHours(0, 0, 0, 0)
	// 		let yesterday = new Date(today)
	// 		yesterday.setDate(yesterday.getDate() - 1)
	// 		let sevenDaysAgo = new Date(today)
	// 		sevenDaysAgo.setDate(today.getDate() - 7)

	// 		let dateVar
	// 		switch (days) {
	// 			case 'today':
	// 				dateVar = today
	// 				break
	// 			case 'yesterday':
	// 				dateVar = yesterday
	// 				break
	// 			case 'last7Days':
	// 				dateVar = sevenDaysAgo // Нет условия по дате, выбираются все заказы
	// 				break
	// 			default:
	// 				throw new Error('Invalid days value')
	// 		}

	// 		const ordersWithCounts = await this.db.$queryRaw`
	// 					SELECT o.*, COUNT(oe."userId") AS "executorsCount"
	// 					FROM "Order" o
	// 					LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
	// 					WHERE o."createdAt" >= ${dateVar}
	// 					GROUP BY o.id
	// 					ORDER BY o."createdAt" DESC
	// 					LIMIT ${pageSize}
	// 					OFFSET ${offset}
	// 			`

	// 		// Преобразуем BigInt в число
	// 		const orders = (ordersWithCounts as Array<any>).map((order) => ({
	// 			...order,
	// 			executorsCount: Number(order.executorsCount),
	// 		}))

	// 		const totalOrdersResult = await this.db.$queryRaw`
	//     SELECT COUNT(*) AS count
	//     FROM "Order" o
	//     WHERE o."createdAt" >= ${dateVar}
	//   `
	// 		const totalOrdersCount = Number(totalOrdersResult[0]?.count || 0)
	// 		const transformedOrders: IOrder[] = orders.map((order) => ({
	// 			...order,
	// 			createdAt: order.createdAt.toISOString(),
	// 			updatedAt: order.updatedAt.toISOString(),
	// 		}))

	// 		return {
	// 			data: transformedOrders,
	// 			totalPages: Math.ceil(totalOrdersCount / pageSize),
	// 		}
	// 	} catch (error) {
	// 		console.log(0, 'Ошибка в findOrdersByDay', error.message)
	// 		throw error.message
	// 	}
	// }

	async findPagination(
		page: number,
		pageSize: number
	): Promise<IPaginationResult<IOrder>> {
		try {
			const offset = (page - 1) * pageSize

			const orders = await this.db.order.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				skip: offset,
				take: pageSize,
			})

			const totalOrders = await this.db.order.count() // Подсчет общего количества заказов

			// Преобразование объектов Date в строки
			const transformedOrders: IOrder[] = orders.map((order) => ({
				...order,
				createdAt: order.createdAt.toISOString(),
				updatedAt: order.updatedAt.toISOString(),
			}))

			// return { ---------- Можно было без трансформации createdAt и updatedAt
			// 	data: orders, ----------- НО ТОГДА ПРИШЛОСЬ БЫ В interface писать к ним any
			// 	totalPages: Math.ceil(totalOrders / pageSize),
			// }
			return {
				data: transformedOrders,
				totalPages: Math.ceil(totalOrders / pageSize),
			}
		} catch (error) {
			console.log(0, 'Ошибка в findAllOrders', error.message)
			throw new Error('Ошибка в findAllOrders: ' + error.message)
		}
	}

	async findByOrderId(orderId: string) {
		try {
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
				include: {
					potentialExecutors: {
						select: {
							user: {
								select: {
									id: true,
									telegramId: true,
								},
							},
						},
					},
					executors: {
						select: {
							user: {
								select: {
									id: true,
									telegramId: true,
									userName: true, // Если вам нужно имя пользователя
								},
							},
						},
					},
				},
			})
			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}
			return order
		} catch (error) {
			console.log('Ошибка в findByOrderId', error.message)
			return error.message
		}
	}

	async removeExecutorFromOrder(
		orderId: string,
		executorId: string
	): Promise<any> {
		const result = await this.db.orderExecutor.delete({
			where: {
				orderId_userId: {
					orderId: Number(orderId),
					userId: executorId,
				},
			},
		})
		return result
	}

	async getPotentialExecutorIdOrder(orderId: string, executorId: string) {
		try {
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
				select: { id: true, address: true, potentialExecutors: true },
			})
			console.log(1111, 'getPotentialExecutorIdOrder', order)
			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}
			const isExecutorIdPresent = order.potentialExecutors.some(
				(potentialExecutor) => potentialExecutor.userId === executorId
			)

			return { isExecutorIdPresent, order }
		} catch (error) {
			console.log(0, 'getPotentialExecutorIdOrder', error.message)
			throw error.message
		}
	}

	async addPotentialExecutor(bot, data) {
		const { orderId, executorId } = data
		try {
			// Находим заказ по ID
			const order = await this.db.order.findUnique({
				where: { id: Number(orderId) },
				select: { id: true }, // Выбираем только ID заказа, чтобы избежать больших объемов данных
			})

			if (!order) {
				throw new NotFoundException(`Нет такого заказа №: ${orderId}`)
			}

			// Проверяем, уже добавлен ли потенциальный исполнитель
			const existingExecutor = await this.db.orderPossibleExecutor.findFirst({
				where: { orderId: Number(orderId), userId: executorId },
			})

			if (existingExecutor) {
				bot.sendMessage(executorId, `Нет смысла жать повторно`)
				return // Если потенциальный исполнитель уже добавлен, завершаем функцию
			}

			// Добавляем нового потенциального исполнителя
			await this.db.orderPossibleExecutor.create({
				data: {
					orderId: Number(orderId),
					userId: executorId,
				},
			})

			console.log(
				'Исполнитель успешно добавлен в список потенциальных исполнителей.'
			)
		} catch (error) {
			console.error('Ошибка в addPotentialExecutor', error.message)
			throw error.message
		}
	}

	async assignUserToOrder(orderId: string, userId: string) {
		try {
			const order = await this.findByOrderId(orderId)

			// Проверяем, есть ли еще места в заказе
			const existingExecutors = await this.db.orderExecutor.count({
				where: {
					orderId: Number(orderId),
				},
			})

			if (existingExecutors >= order.numExecutors) {
				await this.changeOrderStatus(orderId, 'pending')
				throw new Error(
					`В заказе № ${orderId} нет свободных мест, статус заявки перевели в pending`
				)
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

			return { order, userId }
			// return { msg: `Грузчик № ${userId} был добавлен на заказ № ${orderId} .` }
		} catch (error) {
			console.log(0, 'ошибка в assignUserToOrder', error.message)
			throw error
		}
	}

	async changeOrderStatus(orderId: string, status: string) {
		try {
			const order = await this.findByOrderId(orderId)
			if (!order) {
				throw new NotFoundException(`Заказ с ID ${orderId} не найден.`)
			}

			const orderStatusValue: OrderStatus | undefined = statusMap[status]
			if (!orderStatusValue) {
				throw new Error(`Неизвестный статус заказа: ${status}`)
			}

			await this.db.order.update({
				where: { id: Number(orderId) },
				data: {
					status: {
						set: orderStatusValue,
					},
				},
			})
			console.log(`Статус заказа с ID ${orderId} успешно изменен на ${status}.`)
		} catch (error) {
			console.error('Ошибка в changeOrderStatus:', error.message)
			throw new Error(error.message)
		}
	}
}
