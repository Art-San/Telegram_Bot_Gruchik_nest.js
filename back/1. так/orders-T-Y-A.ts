// заказы  за сегодня РАБОТАЛА
// async findAllOrdersForToday(page: number, pageSize: number) {
//   try {
//     const offset = (page - 1) * pageSize

//     // Используем CURRENT_DATE для получения текущей даты
//     const today = new Date()
//     today.setHours(0, 0, 0, 0) // Устанавливаем время в 00:00:00

//     const ordersWithCounts = await this.db.$queryRaw`
//           SELECT o.*, COUNT(oe."userId") AS "executorsCount"
//           FROM "Order" o
//           LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
//           WHERE o."createdAt" >= ${today}
//           GROUP BY o.id
//           ORDER BY o."createdAt" DESC
//           LIMIT ${pageSize}
//           OFFSET ${offset}
//       `

//     // Преобразуем BigInt в число
//     const orders = (ordersWithCounts as Array<any>).map((order) => ({
//       ...order,
//       executorsCount: Number(order.executorsCount),
//     }))

//     return orders
//   } catch (error) {
//     console.log(0, 'Ошибка в findAllOrdersForToday', error.message)
//     throw error.message
//   }
// }

// заказы  за вчера РАБОТАЛА
// async findAllOrdersFromYesterday(page: number, pageSize: number) {
//   try {
//     const offset = (page - 1) * pageSize

//     // Получаем текущую дату и дату вчерашнего дня
//     const today = new Date()
//     today.setHours(0, 0, 0, 0) // Устанавливаем время в 00:00:00
//     let yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)

//     const ordersWithCounts = await this.db.$queryRaw`
//           SELECT o.*, COUNT(oe."userId") AS "executorsCount"
//           FROM "Order" o
//           LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
//           WHERE o."createdAt" >= ${yesterday}
//           GROUP BY o.id
//           ORDER BY o."createdAt" DESC
//           LIMIT ${pageSize}
//           OFFSET ${offset}
//       `

//     // Преобразуем BigInt в число
//     const orders = (ordersWithCounts as Array<any>).map((order) => ({
//       ...order,
//       executorsCount: Number(order.executorsCount),
//     }))

//     return orders
//   } catch (error) {
//     console.log(0, 'Ошибка в findAllOrdersFromYesterday', error.message)
//     throw error.message
//   }
// }

// СЕГОДНЯ ВЧЕРА и СЕМЬ ДНЕЙ работал
// async findTodayYesterdaySevenDay(
//   day: string,
//   page: number,
//   pageSize: number
// ) {
//   try {
//     const offset = (page - 1) * pageSize

//     const today = new Date()
//     today.setHours(0, 0, 0, 0)
//     let yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)
//     let sevenDaysAgo = new Date(today)
//     sevenDaysAgo.setDate(today.getDate() - 7)

//     let dateVar
//     switch (day) {
//       case 'today':
//         dateVar = today
//         break
//       case 'yesterday':
//         dateVar = yesterday
//         break
//       case 'last7Days':
//         dateVar = sevenDaysAgo // Нет условия по дате, выбираются все заказы
//         break
//       default:
//         throw new Error('Invalid day value')
//     }

//     const ordersWithCounts = await this.db.$queryRaw`
//           SELECT o.*, COUNT(oe."userId") AS "executorsCount"
//           FROM "Order" o
//           LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
//           WHERE o."createdAt" >= ${dateVar}
//           GROUP BY o.id
//           ORDER BY o."createdAt" DESC
//           LIMIT ${pageSize}
//           OFFSET ${offset}
//       `
//     console.log(123, 'биг биг', ordersWithCounts)
//     // Преобразуем BigInt в число
//     const orders = (ordersWithCounts as Array<any>).map((order) => ({
//       ...order,
//       executorsCount: Number(order.executorsCount),
//     }))

//     const totalOrdersResult = await this.db.$queryRaw`
//     SELECT COUNT(*) AS count
//     FROM "Order" o
//     WHERE o."createdAt" >= ${dateVar}
//   `
//     const totalOrdersCount = Number(totalOrdersResult[0]?.count || 0)
//     const transformedOrders: IOrder[] = orders.map((order) => ({
//       ...order,
//       createdAt: order.createdAt.toISOString(),
//       updatedAt: order.updatedAt.toISOString(),
//     }))

//     return {
//       data: transformedOrders,
//       totalPages: Math.ceil(totalOrdersCount / pageSize),
//     }
//   } catch (error) {
//     console.log(0, 'Ошибка в findOrdersByDay', error.message)
//     throw error.message
//   }
// }

// Не хотит работать ( тут проблем dateVar = `WHERE o."createdAt" >= '${todayISOString}'`)
// Оставил как пример
// async findTodayYesterdayAllPag(day: string, page: number, pageSize: number) {
//   try {
//     const offset = (page - 1) * pageSize

//     // Get current date and yesterday's date
//     const today = new Date()
//     today.setHours(0, 0, 0, 0) // Set time to 00:00:00
//     const todayISOString = today.toISOString()
//     const yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)
//     const yesterdayISOString = yesterday.toISOString()

//     // Determine the date range based on the day parameter
//     let dateVar = ''
//     if (day === 'today') {
//       dateVar = `WHERE o."createdAt" >= '${todayISOString}'`
//     } else if (day === 'yesterday') {
//       dateVar = `WHERE o."createdAt" >= '${yesterdayISOString}' AND o."createdAt" < '${todayISOString}'`
//     }

//     const ordersWithCounts = await this.db.$queryRaw`
//       SELECT o.*, COUNT(oe."userId") AS "executorsCount"
//       FROM "Order" o
//       LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
//       ${dateVar}
//       GROUP BY o.id
//       ORDER BY o."createdAt" DESC
//       LIMIT ${pageSize}
//       OFFSET ${offset}
//     `

//     // Transform BigInt to number
//     const orders = (ordersWithCounts as Array<any>).map((order) => ({
//       ...order,
//       executorsCount: Number(order.executorsCount),
//     }))

//     // Calculate total orders for pagination
//     const totalOrdersResult = await this.db.$queryRaw`
//       SELECT COUNT(*) AS count
//       FROM "Order" o
//       ${dateVar}
//     `
//     const totalOrdersCount = Number(totalOrdersResult[0]?.count || 0)

//     // Transform the order dates to ISO strings
//     const transformedOrders = orders.map((order) => ({
//       ...order,
//       createdAt: order.createdAt.toISOString(),
//       updatedAt: order.updatedAt.toISOString(),
//     }))

//     return {
//       data: transformedOrders,
//       totalPages: Math.ceil(totalOrdersCount / pageSize),
//     }
//   } catch (error) {
//     console.log('Ошибка в findTodayYesterdayAllPag', error.message)
//     throw error.message
//   }
// }
