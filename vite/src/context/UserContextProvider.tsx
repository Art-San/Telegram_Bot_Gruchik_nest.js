import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext
} from 'react'
import { toast } from 'sonner'

interface IUser {
  telegramId: string
  userName: string
  userAvatar: string
  isAdmin: boolean
}

const UserContext = createContext<{
  currentUser: IUser | null
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>
  isLoading: boolean
}>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true
})

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(
      'useUserContext должен использоваться внутри UserContextProvider.'
    )
  }
  return context
}

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/admin/721836748`,
          {
            method: 'GET', // Явное указание метода
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log(10, res)
        const data = await res.json()
        console.log(11, data)
        if (!res.ok) {
          throw new Error(data.error)
        }
        setCurrentUser(data)
      } catch (error: any) {
        console.error(error)
        toast.error('Ошибка в UserContextProvider')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthUser()
  }, [])

  console.log(333, 'currentUser', currentUser)
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
