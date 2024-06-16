import React, { createContext, useState, ReactNode } from 'react'

interface User {
  telegramId: string
  userName: string
  userAvatar: string
  isAdmin: boolean
}

export interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
