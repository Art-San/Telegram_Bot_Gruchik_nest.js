// // src/users/dto/update-profile.dto.ts
// import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator';
// import { Prisma } from '@prisma/client';

// export class UpdateProfileDto {
//   @IsOptional()
//   @IsString()
//   telegramId?: string | Prisma.NullableStringFieldUpdateOperationsInput;

//   @IsOptional()
//   @IsString()
//   phone?: string | Prisma.NullableStringFieldUpdateOperationsInput;

//   @IsOptional()
//   @IsString()
//   fullName?: string | Prisma.NullableStringFieldUpdateOperationsInput;

//   @IsOptional()
//   @IsUrl()
//   userAvatar?: string | Prisma.NullableStringFieldUpdateOperationsInput;

//   @IsOptional()
//   @IsString()
//   role?: Prisma.EnumRoleFieldUpdateOperationsInput | string;

//   @IsOptional()
//   @IsInt()
//   rating?: number | Prisma.IntFieldUpdateOperationsInput;
// }

// // src/users/user.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '@/prisma/prisma.service';
// import { Prisma, User, Profile } from '@prisma/client';
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

//   // Метод для обновления профиля пользователя
//   async updateUserProfile(userId: number, profileData: UpdateProfileDto): Promise<Profile> {
//     const { telegramId, phone, fullName, userAvatar, role, rating } = profileData;

//     return this.prisma.profile.upsert({
//       where: { userId },
//       update: {
//         telegramId,
//         phone,
//         fullName,
//         userAvatar,
//         role,
//         rating,
//         updatedAt: new Date(),
//       },
//       create: {
//         telegramId,
//         phone,
//         fullName,
//         userAvatar,
//         role,
//         rating,
//         user: {
//           connect: { id: userId },
//         },
//       },
//     });
//   }
// }

// src/users/user.controller.ts
// import { Controller, Post, Body, Param, Put } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User, Profile } from '@prisma/client';
// import { UpdateProfileDto } from './dto/update-profile.dto';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   async createUser(@Body('telegramId') telegramId: string, @Body('userName') userName: string): Promise<User> {
//     return this.userService.createUser(telegramId, userName);
//   }

//   @Put(':id/profile')
//   async updateUserProfile(@Param('id') userId: number, @Body() profileData: UpdateProfileDto): Promise<Profile> {
//     return this.userService.updateUserProfile(userId, profileData);
//   }
// }
