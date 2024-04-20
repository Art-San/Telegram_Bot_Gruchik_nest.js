// Assign

export function getButtonRequestOrder(orderId: string, authorId: string) {
	const opts: {
		parse_mode: 'HTML' | 'Markdown'
		reply_markup: {
			inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
		}
	} = {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Запрос',
						callback_data: `order_response_${orderId}_${authorId}`,
						// callback_data: `order_response_${order.id}` // первоначально ии предлагал order.id
					},
				],
			],
		},
	}
	return opts
}

export function getButtonAssignOrder(orderId: string, executorId: string) {
	const opts: {
		parse_mode: 'HTML' | 'Markdown'
		reply_markup: {
			inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
		}
	} = {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Назначить',
						callback_data: `assign_user_${orderId}_${executorId}`,
					},
				],
			],
		},
	}

	return opts
}

export function getButtonRequestAppointment(
	orderId: string,
	authorId?: string
) {
	const opts: {
		parse_mode: 'HTML' | 'Markdown'
		reply_markup: {
			inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
		}
	} = {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Принял',
						callback_data: `accepted_response_${orderId}`,
						// callback_data: `accepted_response_${orderId}_${authorId}`,
					},
				],
			],
		},
	}
	return opts
}
