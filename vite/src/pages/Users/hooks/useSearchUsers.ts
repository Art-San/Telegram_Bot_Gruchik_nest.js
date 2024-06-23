import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { UserService } from '@/services/user/user.service'

import { IPaginationResult, IUser } from '@/types/users.types'
import { useSearchUsersStore } from '@/zustand/useSearchUsersStore'

const isAuth = true

export function useSearchUsers(
  page: string,
  pageSize: string,
  searchTerm?: string
) {
  const { setUsers, setTotalPages } = useSearchUsersStore()

  const { data, isLoading, isError } = useQuery<IPaginationResult<IUser>>({
    queryKey: ['users list', page, pageSize, searchTerm],
    queryFn: () => UserService.searchUsers(page, pageSize, searchTerm)
    // enabled: isAuth
  })
  console.log(1256, data?.data)
  useEffect(() => {
    if (data) {
      setUsers(data?.data)
      setTotalPages(data?.totalPages)
    }
  }, [data, setUsers, setTotalPages])

  return { isLoading, isError, total: data?.totalPages || 0 }
}
