import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, NextFunction } from 'express'

@Injectable()
export class LoggingInterceptor implements NestMiddleware {
	use(request: Request, next: NextFunction) {
		const logger = new Logger(LoggingInterceptor.name)
		logger.log(`Incoming request: ${request.method} ${request.url}`)
		return next()
	}
}
