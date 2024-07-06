import type { IBase } from '../root.types'

export enum EnumOrderType {
  moving = 'moving',
  construction = 'construction',
  rigging = 'rigging'
}

export interface IOrderResponse extends IBase {
  startTime: string
  numExecutors: number
  typeWork: EnumOrderType
  address: string
  text: string
  hourCost: number
}

export type TypeOrderFormState = Omit<
  IOrderResponse,
  'id' | 'updatedAt' | 'createdAt'
>

// ============ добав позже
export interface User {
  id: number
  telegramId: string
  userName: string
}

export interface Executor {
  user: User
}
export interface PotentialExecutors {
  user: User
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
  potentialExecutors: PotentialExecutors[]
  executors: Executor[]
  status: string
  executorsCount: number
}

export interface IPaginationResult<T> {
  data: T[]
  totalPages: number
}

// startTime: '',
//     numExecutors: 1,
//     typeWork: 'moving',
//     address: '',
//     text: '',
//     hourCost: 450