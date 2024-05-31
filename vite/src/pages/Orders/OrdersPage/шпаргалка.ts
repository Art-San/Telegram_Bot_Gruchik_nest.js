// Для реализации функционала удаления исполнителя из заказа, вам нужно будет выполнить
// две основные операции: удалить запись из таблицы OrderExecutor,
// которая связывает исполнителя с заказом, и затем обновить состояние в вашем приложении,
// чтобы отразить изменения. Вот шаги, которые помогут вам это сделать:

// Шаг 1: Создание API-метода для удаления исполнителя
// Сначала вам нужно создать API-метод в вашем backend, который будет принимать
// ID заказа и ID исполнителя, чтобы удалить их связь. Например,
// в вашем контроллере NestJS это может выглядеть так:

// import { Controller, Post, Body, Param } from '@nestjs/common';
// import { OrderService } from './order.service';

// @Controller('orders')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post(':orderId/remove-executor/:executorId')
//   async removeExecutor(@Param('orderId') orderId: string, @Param('executorId') executorId: string) {
//     return this.orderService.removeExecutorFromOrder(orderId, executorId);
//   }
// }

// В сервисе OrderService вы будете выполнять логику удаления:
// async removeExecutorFromOrder(orderId: string, executorId: string): Promise<any> {
//   const result = await this.db.orderExecutor.delete({
//     where: {
//       orderId_executorId: {
//         orderId: Number(orderId),
//         executorId: executorId,
//       },
//     },
//   });
//   return result;
// }

// Шаг 2: Реализация логики удаления в frontend
// После того как API-метод готов, вы можете вызвать его из вашего
// frontend приложения при нажатии кнопки удаления.
// В вашем компоненте OrderDetails.tsx это может выглядеть так:
// <Button
//   variant="custom"
//   size={'icon'}
//   onClick={() => handleDeleteExecutor(executor.user.id, order.id)}
// >
//   <UserX size={'17'} />
// </Button>

// // Функция для обработки удаления исполнителя
// const handleDeleteExecutor = async (executorId, orderId) => {
//   try {
//     const response = await fetch(`/api/orders/${orderId}/remove-executor/${executorId}`, {
//       method: 'POST',
//     });
//     if (response.ok) {
//       // Обновление состояния, например, перезагрузка списка исполнителей
//       // или удаление конкретного исполнителя из UI
//       console.log('Executor removed successfully');
//     } else {
//       console.error('Failed to remove executor');
//     }
//   } catch (error) {
//     console.error('Error removing executor:', error);
//   }
// };

// Шаг 3: Обновление состояния
// После успешного удаления исполнителя из заказа, вам нужно будет обновить состояние в вашем приложении,
// чтобы отразить эти изменения. Это может включать в себя перезагрузку списка исполнителей
// для данного заказа или удаление конкретного исполнителя из UI.

// Убедитесь, что вы обрабатываете возможные ошибки и
// предоставляете обратную связь пользователю о результате операции удаления.
