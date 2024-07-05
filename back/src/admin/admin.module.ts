import { Module } from '@nestjs/common'
import { AdminOrdersService } from './service-admin-orders.'
import { AdminController } from './admin.controller'
import { AdminUsersService } from './service-admin-users.'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [AdminController],
	providers: [AdminUsersService, AdminOrdersService],
})
export class AdminModule {}
