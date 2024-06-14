import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { corsOptions } from './cors-config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())

	app.enableCors(corsOptions)
	// app.enableCors(corsConfig)

	// app.use(SkipBrowserWarningMiddleware) // Применяем middleware
	app.setGlobalPrefix('api')

	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())

	await app.listen(process.env.PORT || 3001)
	console.log(`Сервер запущен на порту ${process.env.PORT}`)
}
bootstrap()

// на 1:11:03  начинает деплой
// https://www.youtube.com/watch?v=8Dc5kqDOzo8
// import { NestFactory } from '@nestjs/core'
// import { AppModule } from './app.module'
// import { PrismaService } from './prisma.service'

// async function bootstrap() {
// 	const app = await NestFactory.create(AppModule)

// 	app.enableCors()
// 	const prismaService = app.get(PrismaService)
// 	await prismaService.enableShutdownHooks(app)

// 	await app.listen(process.env.PORT || 3000)
// }
// bootstrap()
