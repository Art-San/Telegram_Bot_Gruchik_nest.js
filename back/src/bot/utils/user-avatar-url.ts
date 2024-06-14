import * as TelegramBot from 'node-telegram-bot-api'

export async function getUserAvatarUrl(userId: number, bot: TelegramBot) {
	const userProfile = await bot.getUserProfilePhotos(userId)

	if (!userProfile.photos.length) {
		return ''
	}

	const fileId = userProfile.photos[0][0].file_id
	const file = await bot.getFile(fileId)
	const filePath = file.file_path

	return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`
}
