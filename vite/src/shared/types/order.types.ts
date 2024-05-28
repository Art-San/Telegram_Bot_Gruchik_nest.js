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
  potentialExecutors: string[]
  status: string
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
//   potentialExecutors: string[]
//   hourCount: number
//   status: string
// }
