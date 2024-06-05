import { toast } from 'sonner'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'
import { IAuthForm } from '@/types/auth.types'
import { useNavigate } from 'react-router-dom'

export function useLoginUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: IAuthForm) => AuthService.login(data),
    onSuccess() {
      toast.success('Успешный вход')
      navigate('/')
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    },
    onError: (error) => {
      toast(`Произошла ошибка при входе: `)
      console.error('Произошла ошибка при входе:', error)
    }
  })

  return { login, isPending }
}
