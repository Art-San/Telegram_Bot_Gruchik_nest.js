import { useAuth } from './AuthContext'
import { useState } from 'react'

const LoginPage = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      await login(credentials)
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default LoginPage
