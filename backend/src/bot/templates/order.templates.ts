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

export function formatOrderInfoMessageInit(orderData: IOrderData) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderInit = `
	Заказ № \n
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во <b>грузчиков: ${orderData.numExecutors}</b> 
	Детали заказа: <b>${orderData.text}</b> 
	Оплата за час работы: <b>${orderData.hourCost}</b> 
	`
	// telegramId
	return { templatesOrderInit, buttonsOrder }
}
export function formatOrderInfoMessageEnd(orderData: IOrderData) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderEnd = `
	Заказ № <b>${orderData.id}</b>
	от: ${orderData.authorName}\n
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b> 
	Детали заказа: <b>${orderData.text}</b> 
	Оплата за час работы: <b>${orderData.hourCost}</b> 
	`
	// telegramId
	return templatesOrderEnd
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
