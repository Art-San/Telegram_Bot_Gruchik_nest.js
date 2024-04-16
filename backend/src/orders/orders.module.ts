import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { DbService } from 'src/db/db.service'
import { OrderProcessingService } from './order-processing.service'
import { BotModule } from 'src/bot/bot.module'

@Module({
	imports: [],
	controllers: [OrdersController],
	providers: [OrdersService, OrderProcessingService, DbService],
	exports: [OrderProcessingService],
})
export class OrdersModule {}
