export function extractInfoCallbackQueryCTX(ctx) {
	const data = ctx.data
	const telegramId = String(ctx.from.id)
	const chatId = String(ctx.message.chat.id)
	return { data, telegramId, chatId }
}

export function getUserDetailsFromTelegramContext(ctx) {
	const text = ctx.text
	const telegramId = String(ctx.from.id)
	const chatId = String(ctx.chat.id)
	const userName = ctx.from.username
		? `@${ctx.from.username}`
		: `${ctx.from.first_name} ${ctx.from.last_name}`

	return { text, telegramId, chatId, userName }
}
