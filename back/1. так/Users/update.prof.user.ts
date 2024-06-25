// первый раз создается профиль и в у юзера меняется поле profileFilled: true,
// затем можно обновлять профил
// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { PrismaService } from '@/prisma/prisma.service';
// import { Prisma, User, Profile, Role } from '@prisma/client';
// import { UpdateProfileDto } from './dto/update-profile.dto';

// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   // Метод для поиска пользователя по ID
//   async findUserById(userId: string): Promise<User> {
//     return this.prisma.user.findUnique({
//       where: { id: +userId },
//     });
//   }

//   // Метод для обновления профиля пользователя
//   async updateUserProfile(userId: string, profileData: UpdateProfileDto): Promise<Profile> {
//     const { phone, fullName, userAvatar, role } = profileData;

//     const user = await this.findUserById(userId);
//     if (!user) {
//       throw new NotFoundException('updateUserProfile Юзер в бд не найден');
//     }

//     // Проверка уникальности номера телефона
//     if (phone) {
//       const profileWithPhone = await this.prisma.profile.findUnique({
//         where: { phone: phone },
//       });

//       if (profileWithPhone && profileWithPhone.userId !== +userId) {
//         throw new BadRequestException(`Телефон используется в профиле с telegramId: ${profileWithPhone.telegramId}`);
//       }
//     }

//     try {
//       let profile: Profile;

//       // Проверка существования профиля
//       const existingProfile = await this.prisma.profile.findUnique({
//         where: { userId: +userId },
//       });

//       if (existingProfile) {
//         // Обновление существующего профиля
//         profile = await this.prisma.profile.update({
//           where: { userId: +userId },
//           data: {
//             telegramId: user.telegramId,
//             phone,
//             fullName,
//             userAvatar,
//             role,
//             updatedAt: new Date(),
//           },
//         });
//       } else {
//         // Создание нового профиля
//         profile = await this.prisma.profile.create({
//           data: {
//             telegramId: user.telegramId,
//             phone,
//             fullName,
//             userAvatar,
//             role,
//             rating: 5, // Устанавливаем значение по умолчанию
//             user: {
//               connect: { id: +userId },
//             },
//           },
//         });
//       }

//       // Обновление поля profileFilled у пользователя
//       await this.prisma.user.update({
//         where: { id: +userId },
//         data: { profileFilled: true },
//       });

//       return profile;
//     } catch (error) {
//       console.error('Ошибка при обновлении профиля updateUserProfile', error);
//       throw error;
//     }
//   }
// }

// // src/users/user.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '@/prisma/prisma.service';
// import { Prisma, User, Profile, Role, Experience } from '@prisma/client';
// import { UpdateProfileDto } from './dto/update-profile.dto';

// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   // Метод для создания пользователя при первом посещении
//   async createUser(telegramId: string, userName: string): Promise<User> {
//     return this.prisma.user.create({
//       data: {
//         telegramId,
//         userName,
//       },
//     });
//   }

// throw new NotFoundException('Актер не найден')
// Метод для обновления профиля пользователя
// findUserByTelegramId
// async updateUserProfile(
// 	userId: string,
// 	profileData: UpdateProfileDto
// ): Promise<Profile> {
// 	const { phone, fullName, userAvatar, role } = profileData

// 	const user = await this.findUserById(userId)
// 	if (!user) {
// 		throw new NotFoundException('updateUserProfile Юзер в бд не найден')
// 	}

// 	try {
// 		const updateData: db.ProfileUpdateInput = {
// 			telegramId: user.telegramId ? { set: user.telegramId } : undefined,
// 			phone: phone ? { set: phone } : undefined,
// 			fullName: fullName ? { set: fullName } : 'no name',
// 			userAvatar: userAvatar ? { set: userAvatar } : undefined,
// 			role: role ? { set: role } : 'user',
// 			updatedAt: new Date(),
// 		}

// 		const createData: db.ProfileCreateInput = {
// 			telegramId: user.telegramId,
// 			phone,
// 			fullName,
// 			userAvatar,
// 			role: role,
// 			user: {
// 				connect: { id: +userId },
// 			},
// 		}

// 		return this.db.profile.upsert({
// 			where: { userId: +userId },
// 			update: updateData,
// 			create: createData,
// 		})
// 	} catch (error) {
// 		console.error('Ошибка при обновление профиля updateUserProfile', error)
// 		throw error
// 	}
// }
