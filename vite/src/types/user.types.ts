export interface IUser {
  id: string
  userName: string
  password: string
  createdAt: string
  isAdmin: boolean
}

export interface IUserState {
  email: string
  isAdmin: boolean
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IUserInitialState {
  user: IUserState | null
  isLoading: boolean
}

export interface InterfaceEmailPassword {
  email: string
  password: string
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean
  }
}
