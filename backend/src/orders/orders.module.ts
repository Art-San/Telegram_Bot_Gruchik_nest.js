import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { DbService } from 'src/db/db.service'

@Module({
	controllers: [OrdersController],
	providers: [OrdersService, DbService],
})
export class OrdersModule {}
