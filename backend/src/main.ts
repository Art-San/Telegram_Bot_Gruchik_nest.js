import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	await app.listen(3001)
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
