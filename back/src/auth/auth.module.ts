import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/user/users.module'
import { JwtModule } from '@nestjs/jwt'
import { CookieService } from './cookie.service'

// import { ConfigService } from '@nestjs/config'
// const configService = new ConfigService()

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			// secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: '1d' },
			// secret: process.env.JWT_SECRET
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, CookieService],
})
export class AuthModule {}
