
async getAllCreatedOrders() {
  return this.prisma.order.findMany({
    where: {
      status: 'created',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}