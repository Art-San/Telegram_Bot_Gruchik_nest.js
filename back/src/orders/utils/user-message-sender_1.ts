import TelegramBot from 'node-telegram-bot-api'
import { formatOrderInfoMessageEnd } from 'src/bot/templates/order.templates'
import { IOrderData } from '../dto/order.dto'
import { getButtonRequestOrder } from 'src/message-handler/utils/buttons'

export async function sendsOutToUsers(
	bot: TelegramBot,
	usersId: String[],
	order: IOrderData
) {
	const templatesOrderEnd = formatOrderInfoMessageEnd(order)
	usersId.forEach((id) => {
		const opts = getButtonRequestOrder(String(order.id), order.authorId)

		bot.sendMessage(Number(id), templatesOrderEnd, opts)
	})
}
