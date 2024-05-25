import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class SkipBrowserWarningMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		// res.setHeader('ngrok-skip-browser-warning', 'true') // Устанавливаем заголовок ngrok-skip-browser-warning
		// Или установите пользовательский заголовок User-Agent, если предпочтительнее
		res.setHeader('User-Agent', 'MyCustomAgent')
		next() // Продолжаем обработку запроса
	}
}
