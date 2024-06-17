// import { toast } from 'sonner'

import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'

export function useUser(telegramId: string) {
  const { data, isPending } = useQuery({
    queryKey: ['user', telegramId],
    queryFn: () => AuthService.isAdmin(telegramId),
    select: (data) => data.data,
    // enabled: !!telegramId,
    staleTime: Infinity
  })

  return { data, isPending }
}

// const fetchUser = async (userId: number) => {
//   const response = await fetch(`http://localhost:3000/user/${userId}`)
//   return response.json()
// }

// const { data: user, isLoading } = useQuery(
//   ['user', userId],
//   () => fetchUser(userId!),
//   {
//     enabled: !!userId
//   }
// )
