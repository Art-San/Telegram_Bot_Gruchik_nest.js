// src/cors-config.ts
export const corsConfig = {
	origin: '*',
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: false,
}
export const corsOptions = {
	origin: 'http://localhost:5173', // Замените на домен вашего клиента
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	credentials: true, // Разрешает запросы с учетными данными
}
