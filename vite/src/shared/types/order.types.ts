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

// export interface IOrder {
//   id: number
//   authorId: string
//   authorName: string
//   startTime: string
//   typeWork: string
//   numExecutors: number
//   address: string
//   text: string
//   hourCost: number
//   hourCount: number
//   createdAt: string
//   updatedAt: string
//   potentialExecutors: string[]
//   status: string
//   executors:
// }
