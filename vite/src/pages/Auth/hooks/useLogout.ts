import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'
import { useResetSession } from './useSessionQuery'

export function useLogout() {
  const navigate = useNavigate()
  const resetSession = useResetSession()

  // useQuery для get
  // useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
  // useMutation() НЕ НАШЕЛ isLoading
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => AuthService.logout(),
    async onSuccess() {
      resetSession()
      navigate('/login')
    }
  })

  return { logout, isPending }
}
