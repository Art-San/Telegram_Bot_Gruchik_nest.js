// import TelegramBot from 'node-telegram-bot-api'
// import { formatOrderInfoMessageEnd } from 'src/bot/templates/order.templates'
// import { IOrderData } from '../dto/order.dto'

// // telegram-bot-messaging.ts
// // user-message-sender.ts
// // order-notification-service.ts
// export async function sendsOutToUsers(
// 	bot: TelegramBot,
// 	usersId: String[],
// 	order: IOrderData
// ) {
// 	const templatesOrderEnd = formatOrderInfoMessageEnd(order)

// 	const opts: {
// 		parse_mode: 'HTML' | 'Markdown'
// 		reply_markup: {
// 			inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
// 		}
// 	} = {
// 		parse_mode: 'HTML',
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{
// 						text: 'Назначить',
// 						// callback_data: `order_response_${order.id}`,
// 						callback_data: `assign_user_${orderId}_${executorId}`,
// 					},
// 				],
// 			],
// 		},
// 	}

// 	bot.sendMessage(Number(id), templatesOrderEnd, opts)
// }
// import TelegramBot from 'node-telegram-bot-api'
// import { formatOrderInfoMessageEnd } from 'src/bot/templates/order.templates'
// import { IOrderData } from '../dto/order.dto'

// // telegram-bot-messaging.ts
// // user-message-sender.ts
// // order-notification-service.ts
// export async function sendsOutToUsers(
// 	bot: TelegramBot,
// 	usersId: String[],
// 	order: IOrderData
// ) {
// 	const templatesOrderEnd = formatOrderInfoMessageEnd(order)
// 	usersId.forEach((id) => {
// 		const opts: {
// 			parse_mode: 'HTML' | 'Markdown'
// 			reply_markup: {
// 				inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
// 			}
// 		} = {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: [
// 					[
// 						{
// 							text: 'Принять',
// 							// callback_data: `order_response_${order.id}`,
// 							callback_data: `order_response_${order.id}_${order.createdBy}`,
// 						},
// 					],
// 				],
// 			},
// 		}

// 		bot.sendMessage(Number(id), templatesOrderEnd, opts)
// 	})
// }
