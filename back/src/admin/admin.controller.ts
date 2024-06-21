import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post('orders')
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto)
	}

	@Get('orders')
	findAll() {
		return this.adminService.findAll()
	}

	// @Get()
	// findOne(@Param('id') id: string) {
	//   return this.adminService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
	//   return this.adminService.update(+id, updateAdminDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.adminService.remove(+id);
	// }
}