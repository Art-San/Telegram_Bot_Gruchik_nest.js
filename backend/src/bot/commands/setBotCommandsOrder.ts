import { OrdersService } from 'src/orders/orders.service'

export async function createNewOrder(
	orderData: any,
	ordersService: OrdersService
) {
	try {
		console.log(2, 'createNewOrder', orderData)
		const newOrder = await ordersService.creatingOrder(orderData)
		return { msg: 'Ok' }
	} catch (error) {
		console.log('Ошибка в createNewOrder', error)
		throw error
	}
}
