import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	Res,
	HttpStatus,
	UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { AuthDto, GetSessionInfoDto } from './dto/auth.dto'
import { Response } from 'express'
import { AuthGuard } from './auth.guard'
import { CookieService } from './cookie.service'
import { SessionInfo } from './session-info.decorator'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private cookieService: CookieService
	) {}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const telegramId = dto.password
		const { accessToken } = await this.authService.login(
			dto.userName,
			telegramId
		)

		this.cookieService.setToken(res, accessToken)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	signOut(@Res({ passthrough: true }) res: Response) {
		console.log(345, 'срабатывает ', res)
		this.cookieService.removeToken(res)
	}

	@HttpCode(200)
	@Get('session')
	@UseGuards(AuthGuard)
	getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
		console.log(123, 'session', session)
		return session
	}

	// 	this.cookieService.setToken(res, accessToken)
	// }

	// @Get()
	// findAll() {
	//   return this.authService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.authService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
	//   return this.authService.update(+id, updateAuthDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.authService.remove(+id);
	// }
}
