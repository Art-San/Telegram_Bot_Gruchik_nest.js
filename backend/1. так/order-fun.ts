// Вот пример обновления статуса заказа и проверки времени обновления:async function updateOrderStatus(prisma, orderId, newStatus) {

async function updateOrderStatus(prisma, orderId, newStatus) {
	const updatedOrder = await prisma.order.update({
		where: { id: orderId },
		data: { status: newStatus },
	})

	console.log(
		`Order ${orderId} status updated to ${newStatus} at ${updatedOrder.updatedAt}`
	)
	return updatedOrder
}

// После добавления этого поля, вам нужно будет обновить вашу логику
// создания заказов, чтобы указывать telegramId пользователя,
// создающего заказ, в поле createdBy. Например:
async function createOrder(prisma, orderData, createdBy) {
	const order = await prisma.order.create({
		data: {
			...orderData,
			createdBy: createdBy, // Указываем создателя заказа
		},
	})

	return order
}

// ограничения размера массива
const order = {
	// Ваши данные заказа
	numExecutors: 2,
	executors: ['executor1', 'executor2', 'executor3'], // Предположим, что это массив исполнителей
}

if (order.executors.length > order.numExecutors) {
	throw new Error('Количество исполнителей не может превышать numExecutors')
}

// Сохранение заказа
// await prisma.order.create({
// 	data: order,
// })
