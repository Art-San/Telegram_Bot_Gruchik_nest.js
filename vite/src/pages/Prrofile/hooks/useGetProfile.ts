import { UserService } from '@/services/user/user.service'
import { useQuery } from '@tanstack/react-query'

const baseKey = 'profile'

export function useGetProfile(userId: number) {
  const { data, isLoading, isPending, isError } = useQuery({
    queryKey: [baseKey, 'getProfileById', userId],
    queryFn: () => UserService.getProfile(userId),
    select: (data) => data.data, // избавляемся от лишней data
    retry: 0,
    enabled: !!userId
  })

  return { data, isLoading, isError, isPending }
}

// export const getProfileQuery = (userId: string) => ({
//   queryKey: [baseKey, 'getProfileById', userId],
//   queryFn: () => UserService.getProfile(userId)
// })
// const profileQuery = useQuery({
//   ...getProfileQuery(userId),
//   retry: 0
// })
// ------------------------------------
