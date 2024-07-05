import { Module } from '@nestjs/common'
import { UserController } from './users.controller'
import { UserService } from './users.service'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UsersModule {}
