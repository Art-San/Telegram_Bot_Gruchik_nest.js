import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { IPaginationResult, IUser } from 'src/shared/types/user.types'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private readonly db: DbService) {}

	async findUserTelegramId(telegramId: string) {
		try {
			const user = await this.db.user.findUnique({ where: { telegramId } })
			// return null
			return user
		} catch (error) {
			console.log('findUserTelegramId', error)
			throw error
		}
	}
	async getUserByTelegramId(telegramId: string) {
		try {
			const user = await this.db.user.findUnique({ where: { telegramId } })
			// return null
			return user
		} catch (error) {
			console.log('Ошибка в getUserByTelegramId', error)
			throw error
		}
	}

	async createUser(userName: string, telegramId: string, userAvatar?: string) {
		try {
			const existingUser = await this.getUserByTelegramId(telegramId)
			// const existingUser = await this.db.user.findUnique({
			// 	where: { telegramId: telegramId },
			// })

			if (existingUser) {
				console.log('Пользователь с таким telegramId уже существует')

				return existingUser
			} else {
				const newUser = await this.db.user.create({
					data: { userName, telegramId, userAvatar },
				})
				return newUser
			}
		} catch (error) {
			console.error('Ошибка при регистрации пользователя:', error)
			throw error
		}
	}

	async findAllUsers() {
		try {
			const users = await this.db.user.findMany()
			return users
		} catch (error) {
			console.log('Ошибка в getAllUsers', error)
			throw error
		}
	}

	async searchUsers(
		searchTerm?: string,
		page: number = 1,
		pageSize: number = 10
	): Promise<IPaginationResult<IUser>> {
		const skip = (page - 1) * pageSize

		try {
			const users = await this.db.user.findMany({
				where: {
					OR: [
						{
							telegramId: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							userName: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
				},
				skip,
				take: pageSize,
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					profile: true,
				},
			})

			const totalUsers = await this.db.user.count({
				where: {
					OR: [
						{
							telegramId: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							userName: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
				},
			})

			const totalPages = Math.ceil(totalUsers / pageSize)

			const transformedUsers: IUser[] = users.map((user) => ({
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
				profile: user.profile
					? {
							...user.profile,
							createdAt: user.profile.createdAt.toISOString(),
							updatedAt: user.profile.updatedAt.toISOString(),
						}
					: undefined,
			}))

			return {
				data: transformedUsers,
				totalPages,
			}
		} catch (error) {
			console.error('Error fetching users:', error)
			throw new Error('Could not fetch users')
		}
	}

	// async searchUsers(searchTerm, page, pageSize): Promise<UserDto[]> {
	// 	console.log(12, searchTerm)
	// 	const value = searchTerm ? searchTerm : ''
	// 	try {
	// 		const offset = (page - 1) * pageSize
	// 		const foundUsers: IUser[] = await this.db.user.findMany({
	// 			where: {
	// 				OR: [
	// 					{
	// 						telegramId: {
	// 							contains: value,
	// 							mode: 'insensitive',
	// 						},
	// 					},
	// 					{
	// 						userName: {
	// 							contains: value,
	// 							mode: 'insensitive',
	// 						},
	// 					},
	// 				],
	// 			},
	// 			select: {
	// 				id: true,
	// 				userName: true,
	// 				isAdmin: true,
	// 				profile: true,
	// 				createdAt: true,
	// 			},
	// 			skip: offset,
	// 			take: pageSize,
	// 			orderBy: {
	// 				createdAt: 'desc',
	// 			},
	// 		})

	// 		const transformedOrders = foundUsers.map((user) => ({
	// 			...user,
	// 			createdAt: user.createdAt.toISOString(),
	// 			updatedAt: user.updatedAt.toISOString(),
	// 		}))

	// 		// Преобразуем результат и возвращаем
	// 		const res = foundUsers.map((user) => ({
	// 			id: user.id,
	// 			userName: user.userName,
	// 			isAdmin: user.isAdmin,
	// 			profile: user.profile,
	// 			createdAt: user.createdAt.toISOString(),
	// 		}))
	// 		console.log(res)
	// 		return res
	// 	} catch (error) {
	// 		console.log('Ошибка в searchUsers', error.message)
	// 		throw new Error(error.message)
	// 	}
	// }

	async getAllUsersExceptTheAuthor(authorId: string) {
		try {
			const users = await this.db.user.findMany({
				where: {
					telegramId: {
						not: authorId, // Исключаем автора заказа
					},
				},
			})
			return users
		} catch (error) {
			console.log('Ошибка в getAllUsersExceptTheAuthor', error)
			throw error
		}
	}

	async getActiveUsersExceptTheAuthor(authorId: string) {
		try {
			const users = this.db.user.findMany({
				where: {
					telegramId: {
						not: authorId,
					},
					isActive: true,
				},
			})

			return users
			// return users
		} catch (error) {
			console.log('Ошибка в getActiveUsersExceptTheAuthor', error)
			throw error
		}
	}

	async updateUserIsActive(telegramId: string, isActive) {
		try {
			await this.db.user.update({
				where: { telegramId }, // Предполагаем, что у вас есть поле id в модели User
				data: { isActive: isActive },
			})
			return { msg: 'Обновление поля isActive  на противоположное значение' }
		} catch (error) {
			console.log('Ошибка в updateUserIsActive', error)
			throw error
		}
	}

	async getAdminUsers() {
		try {
			const adminUsers = await this.db.user.findMany({
				where: {
					isAdmin: true,
				},
			})
			return adminUsers
		} catch (error) {
			console.log('Ошибка при получении getRootUsers', error)
			throw error
		}
	}
}
