// получение всех или поиск по id // работала последний раз
async function searchUsers(searchTerm?: string) {
	console.log(123, typeof searchTerm)
	const users = await this.db.user.findMany({
		where: {
			OR: [
				{
					telegramId: {
						contains: searchTerm ? searchTerm : '',
						mode: 'insensitive',
					},
				},
			],
		},
		select: {
			id: true,
			userName: true,
			isAdmin: true,
			profile: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return users.map((user) => ({
		id: user.id,
		userName: user.userName,
		isAdmin: user.isAdmin,
		profile: user.profile,
		createdAt: user.createdAt.toISOString(), // При необходимости преобразуйте дату в строку
	}))
}
