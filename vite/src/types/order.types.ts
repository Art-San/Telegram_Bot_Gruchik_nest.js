import type { IBase } from './root.types'

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

// export type TypeOrderFormState = Partial<
//   Omit<IOrderResponse, 'id' | 'updatedAt' | 'createdAt'>
// >

// startTime: '',
//     numExecutors: 1,
//     typeWork: 'moving',
//     address: '',
//     text: '',
//     hourCost: 450
