import { toast } from 'sonner'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AuthService } from '@/services/auth/auth.service'
import { IAuthForm } from '@/types/auth.types'

export function useLoginUser() {
  const queryClient = useQueryClient()

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: IAuthForm) => AuthService.login(data),
    onSuccess() {
      toast.success('Успешный вход')
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    },
    onError: (error) => {
      toast(`Произошла ошибка при входе: ${error?.response.data.type}`)
      console.error('Произошла ошибка при входе:', error)
    }
  })

  return { login, isPending }
}

// import { useAuthContext } from '@/context/AuthContext'
// import { useState } from 'react'

// import { toast } from 'sonner'

// const useLogin = () => {
//   const [loading, setLoading] = useState(false)
//   const { setAuthUser } = useAuthContext()

//   const login = async (userName: string, password: string) => {
//     try {
//       setLoading(true)
//       const res = await fetch(
//         import.meta.env.VITE_API_URL + '/api/auth/login',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userName, password })
//         }
//       )

//       const data = await res.json()

//       console.log(123, data)
//       if (!res.ok) throw new Error(data.error)
//       setAuthUser(data)
//     } catch (error: any) {
//       toast.error(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { loading, login }
// }
// export default useLogin
