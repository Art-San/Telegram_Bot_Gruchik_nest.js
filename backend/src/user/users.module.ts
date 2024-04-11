import { Module } from '@nestjs/common'
import { UserController } from './users.controller'
import { UserService } from './users.service'
import { DbModule } from 'src/db/db.module'
import { DbService } from 'src/db/db.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, DbService],
})
export class UsersModule {}
