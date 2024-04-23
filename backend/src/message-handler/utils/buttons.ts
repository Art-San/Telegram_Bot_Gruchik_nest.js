// Assign

export function getButtonEditSendOrder() {
	const buttonsEditSend: {
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
						text: 'Редактировать',
						callback_data: 'edit_order',
					},
				],
				[
					{
						text: 'Отправить',
						callback_data: 'send_order',
					},
				],
			],
		},
	}
	return buttonsEditSend
}
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
						text: 'Пропустить',
						callback_data: `order_response_${orderId}_${authorId}_skip`,
					},
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
	idExecutor?: string
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
						callback_data: `accepted_response_${orderId}_${idExecutor}`,
					},
				],
			],
		},
	}
	return opts
}
export function getButtonDelMsg() {
	const butDelMsg: {
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
						text: 'Удалить сообщение',
						callback_data: `delete_message_`,
					},
				],
			],
		},
	}
	return butDelMsg
}
