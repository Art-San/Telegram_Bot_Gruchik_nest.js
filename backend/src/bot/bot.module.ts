import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import { DbService } from 'src/db/db.service'
import { MessageHandlerModule } from 'src/message-handler/message-handler.module'
import { UsersModule } from 'src/user/users.module'
import { BotCommandsService } from './bot-commands.service'

@Module({
	imports: [MessageHandlerModule, UsersModule],
	controllers: [],
	providers: [
		DbService,
		BotService,
		BotCommandsService,
		UserService,
		OrdersService,
	],
})
export class BotModule {}

// @bot.module.ts @bot.service.ts @helpers-CTX.ts @userProcessing.ts @setBotCommands.ts @orderProcessing.ts @users.module.ts @users.service.ts @orders.module.ts @orders.service.ts @message-handler.module.ts @message-handler.service.ts
