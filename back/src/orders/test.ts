import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function findTodayYesterdaySevenDay(
	day: string,
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

		let dateCondition: any
		switch (day) {
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
			default:
				throw new Error('Invalid day value')
		}

		const ordersWithCounts = await prisma.order.findMany({
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

		const totalOrdersCount = await prisma.order.count({
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

export default findTodayYesterdaySevenDay
