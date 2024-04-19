import TelegramBot from 'node-telegram-bot-api'
import { formatOrderInfoMessageEnd } from 'src/bot/templates/order.templates'
import { IOrderData } from '../dto/order.dto'
import { getButtonRequestOrder } from 'src/message-handler/utils/buttons'

// telegram-bot-messaging.ts
// user-message-sender.ts
// order-notification-service.ts
export async function sendsOutToUsers(
	bot: TelegramBot,
	usersId: String[],
	order: IOrderData
) {
	const templatesOrderEnd = formatOrderInfoMessageEnd(order)
	usersId.forEach((id) => {
		const opts = getButtonRequestOrder(String(order.id), order.createdBy)
		// const opts: {
		// 	parse_mode: 'HTML' | 'Markdown'
		// 	reply_markup: {
		// 		inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
		// 	}
		// } = {
		// 	parse_mode: 'HTML',
		// 	reply_markup: {
		// 		inline_keyboard: [
		// 			[
		// 				{
		// 					text: 'Запрос',
		// 					// callback_data: `order_response_${order.id}`,
		// 					callback_data: `order_response_${order.id}_${order.createdBy}`,
		// 				},
		// 			],
		// 		],
		// 	},
		// }

		bot.sendMessage(Number(id), templatesOrderEnd, opts)
	})
}
