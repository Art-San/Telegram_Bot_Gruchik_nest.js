import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api' // URL вашего бэкенда
})

export const fetchHelloWorld = async () => {
  try {
    const response = await apiClient.get('/')
    return response.data
  } catch (error) {
    console.error(11, 'Error fetching data:', error)
    throw error
  }
}
