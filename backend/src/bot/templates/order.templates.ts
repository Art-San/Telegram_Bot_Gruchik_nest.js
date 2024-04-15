import { IOrderData } from 'src/orders/dto/order.dto'

const buttonsOrder = {
	reply_markup: {
		inline_keyboard: [
			[
				{
					text: 'Редактировать',
					callback_data: 'edit_order',
				},
			],
			[
				{
					text: 'Отправить',
					callback_data: 'send_order',
				},
			],
		],
	},
}

// interface IOrder {
// 	id: Number
// 	createdBy: String
// 	startTime: String
// 	numExecutors: Number
// 	address: String
// 	text: String
// 	hourCost: Number
// }
// export function formatOrderInfoMessage(orderData: IOrder) {

// 	const templatesOrderInit = `
// 	Заказ: ${}\n
// 	<b>telegramId:  </b><code>${user.telegramId}</code>
// 	<b>Имя: </b> ${user.userName}
// 	<b>Бот: </b> ${user.isActive ? 'запущен' : 'остановлен'}
// 	<b>Профиль: </b> ${user.profileFilled ? 'Заполнен' : 'не заполнен'}
// 	`
// 	// telegramId
// 	return templatesOrderInit
// }
export function formatOrderInfoMessage(orderData: IOrderData) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderInit = `
	Заказ № \n
	<b>На: ${orderData.startTime}</b>
	<b>Кол-во грузчиков: ${orderData.numExecutors}</b> 
	<b>Детали заказа: ${orderData.text}</b> 
	<b>Оплата за час работы: ${orderData.hourCost}</b> 
	`
	// telegramId
	return { templatesOrderInit, buttonsOrder }
}
