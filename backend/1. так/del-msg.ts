// bot.on('callback_query', async (callbackQuery) => {
// 	const data = callbackQuery.data
// 	if (data.startsWith('accepted_response_')) {
// 		const orderId = data.split('_')[1] // Извлечение orderId из callback_data
// 		try {
// 			// Удаление сообщения с кнопкой
// 			await bot.deleteMessage(
// 				callbackQuery.message.chat.id,
// 				callbackQuery.message.message_id
// 			)
// 			// Здесь можно добавить дополнительную логику, например, обновление статуса заказа в базе данных
// 		} catch (error) {
// 			console.error('Ошибка при удалении сообщения:', error)
// 		}
// 	}
// })
