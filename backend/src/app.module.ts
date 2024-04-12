import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { UserService } from './user/users.service'
import { BotService } from './bot/bot.service'
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [DbModule, OrdersModule],
	controllers: [AppController],
	providers: [AppService, BotService, UserService],
})
export class AppModule {}
