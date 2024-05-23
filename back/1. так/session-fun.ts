// Для отслеживания активности пользователя в системе,
// включая его вход и выход, можно использовать дополнительную
// сущность в вашей схеме Prisma. Эта сущность может называться, например,
// UserSession и содержать информацию о сессиях пользователя,
// включая время входа и выхода.

// model UserSession {
//     id        Int      @id @default(autoincrement())
//     userId    Int
//     user      User     @relation(fields: [userId], references: [id])
//     startedAt DateTime @default(now())
//     endedAt   DateTime?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//    }

// Когда пользователь входит в систему, вы создаете новую запись
// в UserSession:
async function startUserSession(prisma, userId) {
	const session = await prisma.userSession.create({
		data: {
			userId: userId,
		},
	})
	return session
}

// Когда пользователь выходит из системы, вы обновляете запись,
// устанавливая endedAt:
async function endUserSession(prisma, sessionId) {
	const session = await prisma.userSession.update({
		where: { id: sessionId },
		data: { endedAt: new Date() },
	})
	return session
}
