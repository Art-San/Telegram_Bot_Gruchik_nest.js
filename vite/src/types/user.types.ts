export interface IUser {
  id: number
  telegramId: string
  userName: string
  userAvatar: string
  isAdmin: boolean
}

// export interface IUserState {
//   email: string
//   isAdmin: boolean
// }

// export interface ITokens {
//   accessToken: string
//   refreshToken: string
// }

// export interface IUserInitialState {
//   user: IUserState | null
//   isLoading: boolean
// }

// export interface InterfaceEmailPassword {
//   email: string
//   password: string
// }

// export interface IAuthResponse extends ITokens {
//   user: IUser & {
//     isAdmin: boolean
//   }
// }
