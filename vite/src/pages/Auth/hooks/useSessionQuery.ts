import { AuthService } from '@/services/auth/auth.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// const sessionKey = ['session']

export function useSessionQuery() {
  const {
    data: session,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['session'],
    queryFn: () => AuthService.session(),
    retry: 0, // по умолчанию делает несколько попыток залогиниться
    staleTime: 5 * 60 * 1000 //4:32:35 избавлялись от лишних запросов. Если staleTime стал больше 0, у нас появляется потребность в ручной валидации.
  })

  return { session, isLoading, isError }
}

export function useResetSession() {
  const queryClient = useQueryClient()
  return () => queryClient.removeQueries() // Убрали ключ queryKey: sessionKey чтоб удалялся весь кэш
  // return () => queryClient.removeQueries({ queryKey: sessionKey })
}

// export const authControllerGetSessionInfo = (
// 	options?: SecondParameter<typeof createInstance>
// ) => {
// 	return createInstance<GetSessionInfoDto>(
// 		{ url: `/auth/session`, method: 'GET' },
// 		options
// 	)
// }
