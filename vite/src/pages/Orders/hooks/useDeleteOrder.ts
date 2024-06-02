import { toast } from 'sonner'
import { OrderService } from '@/services/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteOrder() {
  const queryClient = useQueryClient()

  const { mutate: deleteOrder, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete order'],
    mutationFn: (id: number) => OrderService.deleteOrder(id),
    onSuccess() {
      toast.success('Успешно удалено')
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    },
    onError: (error) => {
      toast.error('Произошла ошибка при удалении заказа')
      console.error('Ошибка при удалении заказа:', error)
    },
    onSettled: (data, error) => {
      console.log('Этот код будет выполнен как при успехе, так и при ошибке')
      if (error) {
        console.log('Обработка ошибки')
      } else {
        console.log('Обработка успеха')
      }
    }
  })

  return { deleteOrder, isDeletePending }
}
