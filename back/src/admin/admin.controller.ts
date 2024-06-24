import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { AdminOrdersService } from './service-admin-orders.'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { AdminUsersService } from './service-admin-users.'

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminOrdersService: AdminOrdersService,
		private readonly adminUsersService: AdminUsersService
	) {}

	@Get('users/profile/:telegramId')
	getProfileTelegramId(@Param('telegramId') telegramId: string) {
		return this.adminUsersService.findProfile(telegramId)
	}

	// @Post('orders')
	// create(@Body() createAdminDto: CreateAdminDto) {
	// 	return this.AdminOrdersService.create(createAdminDto)
	// }

	// @Get('orders')
	// findAll() {
	// 	return this.AdminOrdersService.findAll()
	// }

	// @Get()
	// findOne(@Param('id') id: string) {
	//   return this.AdminOrdersService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
	//   return this.AdminOrdersService.update(+id, updateAdminDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.AdminOrdersService.remove(+id);
	// }
}
