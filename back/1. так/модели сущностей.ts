// model OrderExecutorComment {
//   id        Int      @id @default(autoincrement())
//   content   String
//   orderId   Int
//   order     Order    @relation(fields: [orderId], references: [id])
//   executorId Int
//   executor  OrderExecutor @relation(fields: [executorId], references: [id])

//   @@id([id, orderId, executorId])
// }

// const orderWithComments = await this.db.order.findUnique({
//   where: { id: Number(orderId) },
//   include: {
//     executors: {
//       include: {
//         comments: true, // Включаем комментарии к исполнителям
//       },
//     },
//   },
// });
