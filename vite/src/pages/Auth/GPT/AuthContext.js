import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials)
      setUser(response.data.user)
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// AuthContext.js
