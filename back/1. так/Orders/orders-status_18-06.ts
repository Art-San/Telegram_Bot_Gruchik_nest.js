// аказы со статусом created будут извлекаться из базы данных
// и сортироваться по полю createdAt в порядке убывания.
async function getAllCreatedOrders() {
	return this.prisma.order.findMany({
		where: {
			status: 'created',
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
}
