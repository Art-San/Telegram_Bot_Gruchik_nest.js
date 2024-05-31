import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeOrderFormState } from '@/types/order.types'
import { OrderService } from '@/services/order.service'

export function useCreateOrder() {
  const queryClient = useQueryClient()

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ['create order'],
    mutationFn: (data: TypeOrderFormState) => OrderService.createOrder(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })

  return { createOrder, isPending }
}
