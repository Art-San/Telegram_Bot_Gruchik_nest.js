import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import { DbService } from 'src/db/db.service'
import { MessageHandlerModule } from 'src/message-handler/message-handler.module'
import { UsersModule } from 'src/user/users.module'
import { BotCommandsService } from './bot-commands.service'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
	imports: [MessageHandlerModule, UsersModule, OrdersModule],
	controllers: [],
	providers: [
		DbService,
		BotService,
		BotCommandsService,
		UserService,
		OrdersService,
	],
	exports: [BotCommandsService],
})
export class BotModule {}
