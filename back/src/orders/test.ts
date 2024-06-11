// day: string, page: number, pageSize: numbe

// перепиши функцю так чтоб
// если day= 'today' то заказы skb за сегодняшний день
// если day= 'yesterday' то заказы за вчера
// если day= 'all' то все заказы

// async findTodayYesterdayAll(day: string, page: number, pageSize: number) {
//   try {
//       const offset = (page - 1) * pageSize;

//       let dateCondition = '';
//       switch (day) {
//           case 'today':
//               dateCondition = `WHERE o."createdAt" >= CURRENT_DATE`;
//               break;
//           case 'yesterday':
//               dateCondition = `WHERE o."createdAt" >= CURRENT_DATE - INTERVAL '1 day' AND o."createdAt" < CURRENT_DATE`;
//               break;
//           case 'all':
//               dateCondition = ''; // Нет условия по дате, выбираются все заказы
//               break;
//           default:
//               throw new Error('Invalid day value');
//       }

//       const ordersWithCounts = await this.db.$queryRaw`
//           SELECT o.*, COUNT(oe."userId") AS "executorsCount"
//           FROM "Order" o
//           LEFT JOIN "OrderExecutor" oe ON o.id = oe."orderId"
//           ${dateCondition}
//           GROUP BY o.id
//           ORDER BY o."createdAt" DESC
//           LIMIT ${pageSize}
//           OFFSET ${offset}
//       `;

//       // Преобразуем BigInt в число
//       const orders = (ordersWithCounts as Array<any>).map((order) => ({
//          ...order,
//           executorsCount: Number(order.executorsCount),
//       }));

//       return orders;
//   } catch (error) {
//       console.log(0, 'Ошибка в findOrdersByDay', error.message);
//       throw error.message;
//   }
// }
