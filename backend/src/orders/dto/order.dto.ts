import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'

export interface IOrderData {
	createdBy?: string
	numExecutors?: number
	text?: string
	address?: string
}

export class CreateOrderDto {
	@IsNotEmpty()
	createdBy: string

	@IsString()
	text: string

	@IsString()
	address: string

	@IsNumber()
	numExecutors: number
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
