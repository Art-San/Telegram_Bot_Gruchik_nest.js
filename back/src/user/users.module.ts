import { Module } from '@nestjs/common'
import { UserController } from './users.controller'
import { UserService } from './users.service'
import { DbService } from 'src/db/db.service'

import { BotCommandsService } from 'src/bot/bot-commands.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		// UserProcessingService,
		BotCommandsService,
		DbService,
	],
	exports: [UserService],
})
export class UsersModule {}
