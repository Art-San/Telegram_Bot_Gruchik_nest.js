// await bot.sendMessage(chatId, 'Выберите действие:', {
// 	reply_markup: {
// 		keyboard: [
// 			[
// 				{
// 					text: 'Действие 1',
// 					callback_data: JSON.stringify({
// 						action: 'action1',
// 						extraData: 'someValue',
// 					}),
// 				},
// 				{
// 					text: 'Действие 2',
// 					callback_data: JSON.stringify({
// 						action: 'action2',
// 						extraData: 'anotherValue',
// 					}),
// 				},
// 			],
// 		],
// 	},
// })

// bot.on('callback_query', async (ctx) => {
// 	const { data } = ctx.callbackQuery
// 	const buttonAction = JSON.parse(data)
// 	switch (buttonAction.action) {
// 		case 'action1':
// 			// Обработка нажатия на первую кнопку
// 			break
// 		case 'action2':
// 			// Обработка нажатия на вторую кнопку
// 			break
// 	}
// })
