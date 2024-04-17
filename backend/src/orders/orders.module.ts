import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { DbService } from 'src/db/db.service'
import { OrderProcessingService } from './order-processing.service'
import { MessageHandlerModule } from 'src/message-handler/message-handler.module'

@Module({
	imports: [MessageHandlerModule],
	controllers: [OrdersController],
	providers: [OrdersService, OrderProcessingService, DbService],
	exports: [OrderProcessingService],
})
export class OrdersModule {}
