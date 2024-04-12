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
	<b>telegramId:  </b><code>${user.telegramId}</code>
	<b>Имя: </b> ${user.userName}
	<b>Бот: </b> ${user.isActive ? 'запущен' : 'остановлен'}
	<b>Профиль: </b> ${user.profileFilled ? 'Заполнен' : 'не заполнен'}
	`
	// telegramId
	return templatesUser
}
