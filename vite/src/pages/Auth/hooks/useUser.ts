// import { toast } from 'sonner'

import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'

const telegramId = '721836748'
export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: () => AuthService.isAdmin(telegramId),
    select: (data) => data.data,
    staleTime: Infinity
  })

  return { data, isPending }
}
