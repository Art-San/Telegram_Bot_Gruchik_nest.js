import { DbModule } from './../db/db.module'
import { Module, forwardRef } from '@nestjs/common'
import { BotService } from './bot.service'
import { MessageHandlerModule } from 'src/message-handler/message-handler.module'
import { UsersModule } from 'src/user/users.module'
import { BotCommandsService } from './bot-commands.service'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
	imports: [
		DbModule,
		MessageHandlerModule,
		UsersModule,
		forwardRef(() => OrdersModule), // https://docs.nestjs.com/fundamentals/circular-dependency#:~:text=Design%20Pickle%20%2D%20See,Circular%20dependency
	],
	controllers: [],
	providers: [BotService, BotCommandsService],
	exports: [BotCommandsService, BotService],
})
export class BotModule {}
