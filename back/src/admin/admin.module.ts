import { Module } from '@nestjs/common'
import { AdminOrdersService } from './service-admin-orders.'
import { AdminController } from './admin.controller'
import { AdminUsersService } from './service-admin-users.'
import { DbService } from 'src/db/db.service'

@Module({
	controllers: [AdminController],
	providers: [DbService, AdminUsersService, AdminOrdersService],
})
export class AdminModule {}
