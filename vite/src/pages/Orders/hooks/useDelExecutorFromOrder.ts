import { OrderService } from '@/services/order/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDelExecutorFromOrder() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteExecutorFromOrder,
    isPending: isDeletePending,
    isError,
    error
  } = useMutation({
    mutationKey: ['delete executor order'],
    mutationFn: ({
      orderId,
      executorId
    }: {
      orderId: string
      executorId: string
    }) => OrderService.deleteExecutorFromOrder(orderId, executorId),
    onSuccess: () => {
      // Invalidate multiple queries that might be affected
      toast.success('Executor удален!')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order'] })
      queryClient.invalidateQueries({ queryKey: ['executors'] })
      // Add any additional keys here if needed
    }
  })

  return { deleteExecutorFromOrder, isDeletePending, isError, error }
}
