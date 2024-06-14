// import { toast } from 'sonner'

import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'

const telegramId = '721836748'
export function useIsAdmin() {
  const { data, isPending } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: () => AuthService.isAdmin(telegramId),
    staleTime: Infinity
  })

  return { data, isPending }
}
