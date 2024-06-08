import { toast } from 'sonner'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeOrderFormState } from '@/types/order.types'
import { OrderService } from '@/services/order/order.service'

export function useCreateOrder() {
  const queryClient = useQueryClient()

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ['create order'],
    mutationFn: (data: TypeOrderFormState) => OrderService.createOrder(data),
    onSuccess() {
      toast.success('Успешно создана заявка')
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })

  // если  mutate то react-query сам обрабатывает ошибки
  // если  mutateAsync то самому придется обрабатывает ошибки

  return { createOrder, isPending }
}
