import { OrderService } from '@/services/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDelExecutorFromOrder() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteExecutorFromOrder,
    isPending: isDeletePending,
    isError
  } = useMutation({
    mutationKey: ['delete executor order'],
    mutationFn: ({
      orderId,
      executorId
    }: {
      orderId: string
      executorId: string
    }) => OrderService.deleteExecutorFromOrder(orderId, executorId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })

  return { deleteExecutorFromOrder, isDeletePending, isError }
}
