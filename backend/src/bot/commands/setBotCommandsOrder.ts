import { OrdersService } from 'src/orders/orders.service'

export async function createOrder(
	orderData: any,
	ordersService: OrdersService
) {
	try {
		console.log(2, 'createNewOrder', orderData)
		const newOrder = await ordersService.creatingOrder(orderData)
		console.log(2, newOrder)
		return { msg: 'Ok' }
	} catch (error) {
		console.log('Ошибка в createNewOrder', error)
		throw error
	}
}
