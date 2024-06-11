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
