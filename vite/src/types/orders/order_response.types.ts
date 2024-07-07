export interface IOrderResponseP {
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
  potentialExecutors: PotentialExecutor[]
  executors: Executor[]
}

export interface PotentialExecutor {
  user: User
}

export interface User {
  id: number
  telegramId: string
}

export interface Executor {
  user: User2
}

export interface User2 {
  id: number
  telegramId: string
  userName: string
}
