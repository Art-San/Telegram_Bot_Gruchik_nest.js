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
	Кол-во грузчиков: <b>${orderData.numExecutors}</b> 
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
export function formatOrderInfoMessageFinish(orderData: IOrderData, user: any) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderEnd = `
	Грузчик ${user.userName},
	telegramId: ${user.telegramId}.\n
	Назначены исполнителем на:\n
	Заказ № <b>${orderData.id}</b>
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Детали заказа: <b>${orderData.text}</b>
	Оплата за час работы: <b>${orderData.hourCost}</b>
	`
	// telegramId
	return templatesOrderEnd
}
export function formatOrderInfoMessageFinish2(
	orderData: IOrderData,
	user: any
) {
	// console.log(1, 'orderData', orderData)
	const templatesOrderEnd = `
	Вы ${user.userName},
	ваш telegramId: ${user.telegramId}.\n
	Назначены исполнителем на:
	Заказ № <b>${orderData.id}</b>
	от: ${orderData.authorName}
	На: <b>${orderData.startTime}</b>
	Адрес: <b>${orderData.address}</b>
	Кол-во грузчиков: <b>${orderData.numExecutors}</b>
	Детали заказа: <b>${orderData.text}</b>
	Оплата за час работы: <b>${orderData.hourCost}</b>
	`
	// telegramId
	return templatesOrderEnd
}
