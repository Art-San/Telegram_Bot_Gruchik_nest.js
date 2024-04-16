import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { DbService } from 'src/db/db.service'
import { OrderProcessingService } from './order-processing.service'

@Module({
	controllers: [OrdersController],
	providers: [OrdersService, OrderProcessingService, DbService],
})
export class OrdersModule {}
