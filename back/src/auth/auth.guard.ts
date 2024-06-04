import { CookieService } from './cookie.service'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest() as Request // Достаем токен
		const token = req.cookies[CookieService.tokenKey]

		console.log(1234, 'token ', token)
		if (!token) {
			throw new UnauthorizedException({ message: 'нет токена в куках' })
		}

		try {
			const sessionInfo = this.jwtService.verifyAsync(token, {
				secret: configService.get('JWT_SECRET'),
			})
			//const sessionInfo = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })

			req['session'] = sessionInfo //в req в поле 'session' записываем информацию о текущей сессии
			// получим в session-info.decorator.ts данные из session
		} catch {
			throw new UnauthorizedException({ message: 'ошибка AuthGuard' })
		}
		return true
	}
}
