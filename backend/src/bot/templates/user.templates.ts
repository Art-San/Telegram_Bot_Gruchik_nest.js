// `Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`,

interface IUser {
	id: Number
	telegramId: String
	userName: String
	isActive: Boolean
	profileFilled: Boolean
}
export function formatUserInfoMessage(user: IUser) {
	console.log(0, user)
	const templatesUser = `
	Карточка пользователя\n
	<b>rating:  ⭐⭐⭐⭐⭐</b>
	<b>telegramId:  </b><code>${user.telegramId}</code>
	<b>Имя: </b> ${user.userName}
	<b>Бот: </b> ${user.isActive ? 'запущен' : 'остановлен'}
	<b>Профиль: </b> ${user.profileFilled ? 'Заполнен' : 'не заполнен'}
	`
	// telegramId
	return templatesUser
}

// export function formatUserInfoMessage(user: IUser) {
// 	console.log(0, user)
// 	// Создаем строку с звездами в зависимости от значения user.ratio
// 	const stars = '⭐'.repeat(user.ratio);
// 	const templatesUser = `
// 	Карточка пользователя\n
// 	<b>rating: ${stars}</b>
// 	<b>telegramId: </b><code>${user.telegramId}</code>
// 	<b>Имя: </b> ${user.userName}
// 	<b>Бот: </b> ${user.isActive ? 'запущен' : 'остановлен'}
// 	<b>Профиль: </b> ${user.profileFilled ? 'Заполнен' : 'не заполнен'}
// 	`
// 	// telegramId
// 	return templatesUser
// }

export function formatTemplateMessage(user: IUser) {
	console.log(0, user)
	const template = `
				Раздел помощи HTML\n\n
				<b>Жирный Текст</b>\n
				<i>Текст Курсивом</i>\n
				<code>Текст с Копированием</code>\n
				<s>Перечеркнутый текст</s>\n
				<u>Подчеркнутый текст</u>\n
				<pre language='c++'>код на c++</pre>\n
				<a href='t.me'>Гиперссылка</a>`
	// telegramId
	return template
}

// if (text == '/help') {
// 	await bot.sendMessage(
// 		chatId,
// 		`Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`,
// 		{
// 			parse_mode: 'HTML',
// 		}
// 	)
// }
