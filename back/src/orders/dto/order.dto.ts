import { TypeWork } from '@prisma/client'
import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsOptional,
	IsIn,
} from 'class-validator'

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

	@IsString()
	startTime: string

	@IsNumber()
	numExecutors: number

	@IsIn(['moving', 'construction', 'rigging'])
	typeWork: TypeWork

	@IsString()
	address: string

	@IsString()
	text: string

	@IsNumber()
	hourCost: number
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
