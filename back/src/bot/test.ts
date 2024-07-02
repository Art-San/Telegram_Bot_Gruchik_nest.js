// export function getButtonCreatingProfile(webAppUrl: string) {
// 	const butCreatingProfile: {
// 		parse_mode: 'HTML' | 'Markdown'
// 		reply_markup: {
// 			inline_keyboard: Array<Array<{ text: string; web_app: { url: string } }>>
// 		}
// 	} = {
// 		parse_mode: 'HTML',
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{
// 						text: 'Заполнить профиль',
// 						web_app: { url: webAppUrl + '/profile/creating' },
// 					},
// 				],
// 			],
// 		},
// 	}
// 	return butCreatingProfile
// }

// const butDelMsg = getButtonCreatingProfile()

// bot.sendMessage(chatId, 'Ожидайте несколько минут...', butDelMsg)
