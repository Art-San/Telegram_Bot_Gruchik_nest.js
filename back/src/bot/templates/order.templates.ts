import { IOrderData } from 'src/orders/dto/order.dto'

// const buttonsOrder = {
// 	reply_markup: {
// 		inline_keyboard: [
// 			[
// 				{
// 					text: 'Редактировать',
// 					callback_data: 'edit_order',
// 				},
// 			],
// 			[
// 				{
// 					text: 'Отправить',
// 					callback_data: 'send_order',
// 				},
// 			],
// 		],
// 	},
// }

const getEmojiWork = (type): string => {
	switch (type) {
		case 'moving':
			return '🚚🛍️🪑🥶🛋️📦'
		case 'construction':
			return '🧱 🏗️ 🏖️ 🛠️'
		case 'rigging':
			return '🎹 🏗️ 🔒'
		default:
			return '❓'
	}
}

export function formatOrderInfoMessageInit(orderData: IOrderData) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderInit = `
	от: ${orderData.authorName}
	Заказ № <b>${orderData.id || '----'}</b>\n
	На: <b>${orderData.startTime}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Вид работ: <b>${getEmojiWork(orderData?.typeWork)}</b>
	Адрес: <b>${orderData.address}</b>
	Детали заказа: <b>${orderData.text}</b> 
	Оплата за час работы: <b>${orderData.hourCost}</b> 
	`
	// telegramId
	return templatesOrderInit
}
export function formatOrderInfoMessageEnd(orderData: IOrderData) {
	const templatesOrderEnd = `
	Заказ № <b>${orderData.id}</b>
	от: ${orderData.authorName}\n
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Вид работ: <b>${getEmojiWork(orderData?.typeWork)}</b>
	Детали заказа: <b>${orderData.text}</b> 
	Оплата за час работы: <b>${orderData.hourCost}</b> 
	`
	// telegramId
	return templatesOrderEnd
}
export function formatOrderMsgAuthorFin(orderData: IOrderData, user: any) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderEnd = `
	Грузчик ${user.userName},
	telegramId: ${user.telegramId}.\n
	Назначены исполнителем на:\n
	Заказ № <b>${orderData.id}</b>
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Вид работ: <b>${getEmojiWork(orderData?.typeWork)}</b>
	Детали заказа: <b>${orderData.text}</b>
	Оплата за час работы: <b>${orderData.hourCost}</b>
	`
	// telegramId
	return templatesOrderEnd
}
export function formatOrderMsgExecutorFin(orderData: IOrderData) {
	const msgOrderExecutorFin = `
	Заказ № <b>${orderData.id}</b>\n
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Вид работ: <b>${getEmojiWork(orderData?.typeWork)}</b>
	Детали заказа: <b>${orderData.text}</b>
	Оплата за час работы: <b>${orderData.hourCost}</b>\n
	По всем возникшем вопросам связанными с заказом
	связаться с ${orderData.authorName}. 
	`
	// telegramId
	return msgOrderExecutorFin
}
