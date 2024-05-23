import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'

export interface IOrderData {
	id?: number
	authorId?: string
	authorName?: string
	startTime?: string
	typeWork?: string
	numExecutors?: number
	text?: string
	hourCost?: number
	address?: string
}

export class CreateOrderDto {
	@IsNotEmpty()
	authorId: string

	@IsNotEmpty()
	authorName: string

	@IsNumber()
	numExecutors: number

	@IsString()
	startTime: string

	@IsString()
	text: string

	@IsString()
	address: string
}
// export class OrderDto {
// 	id?: number

// 	@IsNotEmpty()
// 	createdBy: string

// 	@IsString()
// 	text: string

// 	@IsString()
// 	address: string

// 	@IsNumber()
// 	numExecutors: number

// 	@IsNumber()
// 	hourCost?: number

// 	@IsNumber()
// 	hourCount?: number

// 	@IsOptional()
// 	potentialExecutors?: string[]

// 	@IsOptional()
// 	executors?: any[] // Замените any[] на более конкретный тип, если известен

// 	@IsString()
// 	status: string
// }
