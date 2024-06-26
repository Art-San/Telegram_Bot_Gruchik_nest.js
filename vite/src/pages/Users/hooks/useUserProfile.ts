import { UserService } from '@/services/user/user.service'
import { useQuery } from '@tanstack/react-query'

const baseKey = 'user'

// export const getProfileQuery = (userId: string) => ({
//   queryKey: [baseKey, 'getProfileById', userId],
//   queryFn: () => UserService.getProfile(userId)
// })
// const profileQuery = useQuery({
//   ...getProfileQuery(userId),
//   retry: 0
// })
// ------------------------------------
export function useUserProfile(userId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [baseKey, 'getProfileById', userId],
    queryFn: () => UserService.getProfile(userId),
    select: (data) => data.data, // избавляемся от лишней data
    retry: 0
  })

  return { data, isLoading, isError }
}

//-------------------
// export function useSearchUsers(
//   page: string,
//   pageSize: string,
//   searchTerm?: string
// ) {
//   const { setUsers, setTotalPages } = useSearchUsersStore()

//   const { data, isLoading, isError } = useQuery<IPaginationResult<IUser>>({
//     queryKey: ['users list', page, pageSize, searchTerm],
//     queryFn: () => UserService.searchUsers(page, pageSize, searchTerm)
//     // enabled: isAuth
//   })
//   console.log(1256, data?.data)
//   useEffect(() => {
//     if (data) {
//       setUsers(data?.data)
//       setTotalPages(data?.totalPages)
//     }
//   }, [data, setUsers, setTotalPages])

//   return { isLoading, isError, total: data?.totalPages || 0 }
// }
