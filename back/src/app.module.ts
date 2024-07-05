import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { OrdersModule } from './orders/orders.module'
import { BotModule } from './bot/bot.module'
import { MessageHandlerModule } from './message-handler/message-handler.module'
import { AuthModule } from './auth/auth.module'
import { AdminModule } from './admin/admin.module'
// import { TelegramModule } from './telegram/telegram.module'

@Module({
	imports: [
		DbModule,
		OrdersModule,
		MessageHandlerModule,
		AuthModule,
		AdminModule,
		BotModule,
		// TelegramModule,
	],
	controllers: [AppController],
	providers: [AppService],
	// providers: [AppService, BotService, UserService, OrdersService],
})
export class AppModule {}
