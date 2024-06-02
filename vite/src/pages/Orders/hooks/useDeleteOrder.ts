import { OrderService } from '@/services/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  const { mutate: deleteOrder, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete order'],
    mutationFn: (id: string) => OrderService.deleteOrder(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })

  return { deleteOrder, isDeletePending }
}
