// message-handler.module.ts
import { Module } from '@nestjs/common'
import { MessageHandlerService } from './message-handler.service'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import { DbModule } from 'src/db/db.module'
import { BotCommandsService } from 'src/bot/bot-commands.service'

@Module({
	imports: [DbModule],
	providers: [
		MessageHandlerService,
		UserService,
		OrdersService,
		BotCommandsService,
	],
	exports: [MessageHandlerService],
})
export class MessageHandlerModule {}
