import { UserService } from '@/services/user/user.service'
import { useQuery } from '@tanstack/react-query'

export function useUserProfile(userId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user profile']
    // queryFn: () => UserService.searchUsers(userId)
  })

  return { data, isLoading, isError }
}

// type Props = {}
// const useUserProfile = (props: Props) => {
//   return (
//     <div>useUserProfile</div>
//   )
// }
// const isAuth = true

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
