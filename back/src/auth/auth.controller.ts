import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	Res,
	HttpStatus,
	UseGuards,
	Param,
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
		const { data, accessToken } = await this.authService.login(
			dto.userName,
			telegramId
		)

		this.cookieService.setToken(res, accessToken)
		return data
	}

	@HttpCode(200)
	@Post('admin')
	async IsAdmin(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const telegramId = dto.password
		return this.authService.isAdmin(dto.userName, telegramId)
	}

	@HttpCode(200)
	@Get('admin/:id')
	async IsAdmin2(@Param('id') id: string) {
		const res = await this.authService.isAdmin2(id)
		console.log(12, res)
		return res
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	Logout(@Res({ passthrough: true }) res: Response) {
		// console.log(345, 'срабатывает ', res)
		this.cookieService.removeToken(res)
		return true
	}

	@HttpCode(200)
	@Get('session')
	@UseGuards(AuthGuard)
	getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
		console.log(123, 'session', session)
		return session
	}
	@HttpCode(200)
	@Get('me')
	@UseGuards(AuthGuard)
	getMe(@SessionInfo() session: GetSessionInfoDto) {
		// console.log(123, 'session', session)
		return session
	}
}
