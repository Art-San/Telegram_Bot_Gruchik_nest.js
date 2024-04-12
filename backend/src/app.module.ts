import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { OrdersModule } from './orders/orders.module'
import { BotModule } from './bot/bot.module'

@Module({
	imports: [DbModule, OrdersModule, BotModule],
	controllers: [AppController],
	providers: [AppService],
	// providers: [AppService, BotService, UserService, OrdersService],
})
export class AppModule {}
