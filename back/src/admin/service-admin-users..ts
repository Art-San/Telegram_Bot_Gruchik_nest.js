import { Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class AdminUsersService {
	constructor(private readonly db: DbService) {}
	// findProfile(id: number) {
	// 	return `This action returns a #${id} admin`
	// }

	async findProfile(telegramId: string) {
		try {
			const user = await this.db.user.findUnique({ where: { telegramId } })
			// return null
			return user
		} catch (error) {
			console.log('Ошибка в findProfile', error)
			throw error
		}
	}

	// create(createAdminDto: CreateAdminDto) {
	// 	return 'This action adds a new admin'
	// }

	// findAll() {
	// 	return `This action returns all admin`
	// }

	// update(id: number, updateAdminDto: UpdateAdminDto) {
	// 	return `This action updates a #${id} admin`
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} admin`
	// }
}
