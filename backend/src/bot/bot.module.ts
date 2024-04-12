import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { UserService } from 'src/user/users.service'
import { OrdersService } from 'src/orders/orders.service'
import { DbService } from 'src/db/db.service'

@Module({
	imports: [],
	controllers: [],
	providers: [DbService, BotService, UserService, OrdersService],
})
export class BotModule {}
