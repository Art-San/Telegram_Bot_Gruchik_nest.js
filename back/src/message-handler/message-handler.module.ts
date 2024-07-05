// message-handler.module.ts
import { Module, forwardRef } from '@nestjs/common'
import { MessageHandlerService } from './message-handler.service'
import { DbModule } from 'src/db/db.module'
import { UsersModule } from 'src/user/users.module'
import { OrdersModule } from 'src/orders/orders.module'

@Module({
	imports: [
		DbModule,
		UsersModule,
		forwardRef(() => OrdersModule), // https://docs.nestjs.com/fundamentals/circular-dependency#:~:text=Design%20Pickle%20%2D%20See,Circular%20dependency
	],
	providers: [MessageHandlerService],
	exports: [MessageHandlerService],
})
export class MessageHandlerModule {}
