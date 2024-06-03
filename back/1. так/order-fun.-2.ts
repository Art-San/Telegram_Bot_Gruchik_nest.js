// GPT
// Чтобы добавить пагинацию и фильтрацию по заявкам за сегодня и вчера,
// можно обновить вашу функцию следующим образом:

// Шаги:
// Добавить поддержку пагинации с параметрами page и pageSize.
// Фильтровать заказы по дате создания, чтобы выводились только заказы за сегодня и вчера.
// Обновлен
// async findAllOrders(page = 1, pageSize = 10) {
//   try {
//       const offset = (page - 1) * pageSize;

//       // Получаем текущую дату и дату вчерашнего дня
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Устанавливаем время в 00:00:00
//       const yesterday = new Date(today);
//       yesterday.setDate(yesterday.getDate() - 1);

//       const orders = await this.db.order.findMany({
//           where: {
//               createdAt: {
//                   gte: yesterday,
//               },
//           },
//           orderBy: {
//               createdAt: 'desc',
//           },
//           skip: offset,
//           take: pageSize,
//       });

//       return orders;
//   } catch (error) {
//       console.log(0, 'Ошибка в findAllOrders', error.message);
//       throw error.message;
//   }
// }

// Объяснение:
// Пагинация: Используются параметры page и pageSize для определения
// сдвига (offset) и количества элементов (take), которые будут извлечены.
// Фильтрация по дате: Добавлено условие where для фильтрации заказов, созданных за вчера и сегодня.
// Устанавливается время текущей даты в 00:00:00 и затем получаем дату вчерашнего дня.
// Обработка ошибок: Ошибка логируется и выбрасывается с сообщением.

// const page = 1; // Номер страницы
// const pageSize = 10; // Количество элементов на странице

// const orders = await findAllOrders(page, pageSize);
// console.log(orders);

//===================================================================
// тяжелая
// async findAllOrders() {
//   try {
//     const orders = await this.db.order.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })
//     const potentialExecutorsCounts = await Promise.all(
//       orders.map(async (order) => {
//         const count = await this.db.orderPossibleExecutor.count({
//           where: {
//             orderId: order.id,
//           },
//         })
//         return { ...order, potentialExecutorsCount: count }
//       })
//     )
//     console.log(12, potentialExecutorsCounts)
//     return orders
//   } catch (error) {
//     console.log(0, 'Ошибка в findAllOrders', error.message)
//     throw error.message
//   }
// }

// async findAllOrders() {
//   try {
//     const orders = await this.db.order.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })
//     return orders
//   } catch (error) {
//     console.log(0, 'Ошибка в findAllOrders', error.message)
//     throw error.message
//   }
// }
