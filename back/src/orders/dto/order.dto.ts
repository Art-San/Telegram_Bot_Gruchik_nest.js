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

export interface IOrder {
	id: number
	authorId: string
	authorName: string
	startTime: string
	typeWork: string
	numExecutors: number
	address: string
	text: string
	hourCost: number
	hourCount: number
	createdAt: string
	updatedAt: string
	status: string
}

export interface IPaginationResult<T> {
	data: T[]
	totalPages: number
}
