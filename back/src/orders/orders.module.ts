import { UsersModule } from './../user/users.module'
import { Module, forwardRef } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrderProcessingService } from './order-processing.service'
import { MessageHandlerModule } from 'src/message-handler/message-handler.module'
import { DbModule } from 'src/db/db.module'
import { BotModule } from 'src/bot/bot.module'

@Module({
	imports: [
		DbModule,
		UsersModule,
		forwardRef(() => MessageHandlerModule),
		forwardRef(() => BotModule), // https://docs.nestjs.com/fundamentals/circular-dependency#:~:text=Design%20Pickle%20%2D%20See,Circular%20dependency
	],
	controllers: [OrdersController],
	providers: [OrdersService, OrderProcessingService],
	exports: [OrdersService, OrderProcessingService],
})
export class OrdersModule {}
