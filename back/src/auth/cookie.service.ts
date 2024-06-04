import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class CookieService {
	static tokenKey = 'access-token'

	setToken(res: Response, token: string) {
		res.cookie(CookieService.tokenKey, token, {
			httpOnly: true, // что бы нельзя было достать из JS
			maxAge: 24 * 60 * 60 * 1000, //То сколько будут жить куки, должно быть синхронизировано с жизнью токена
			sameSite: 'none', // 6:07:50
			secure: true, // это для расширения 6:07:50
		})
	}

	removeToken(res: Response) {
		res.clearCookie(CookieService.tokenKey)
	}
}
