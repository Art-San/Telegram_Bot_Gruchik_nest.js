export enum OrderStatus {
	created = 'created',
	pending = 'pending',
	inProgress = 'inProgress',
	completed = 'completed',
}

export const statusMap: Record<string, OrderStatus> = {
	created: OrderStatus.created,
	pending: OrderStatus.pending,
	inProgress: OrderStatus.inProgress,
	completed: OrderStatus.completed,
}

// enum OrderStatus {
//   Created = 'Created',
//   Processing = 'Processing',
//   Shipped = 'Shipped',
//   Delivered = 'Delivered',
//   Cancelled = 'Cancelled'
// }
