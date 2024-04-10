import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { RegisterDto } from './dto/registr.dto'

@Controller('user')
export class UserController {
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		// return this.AuthService.register(dto)
	}
}
