import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  startTime: z.string().min(1, {
    message: 'Не должно быть пустым'
  }),
  numExecutors: z.union([z.number(), z.undefined(), z.string()]),
  typeWork: z.string().min(1, 'Не должно быть пустым'),
  address: z.string().min(1, 'Не должно быть пустым'),
  text: z.string().min(1, 'Не должно быть пустым'),
  hourCost: z
    .number({ message: 'Должно быть число' })
    .min(1, 'Не должно быть пустым')
})

export function OrderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '',
      numExecutors: undefined,
      typeWork: 'moving',
      address: '',
      text: '',
      hourCost: 450
    }
  })

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log('Submitted values:', values)
  //   // Do something with the form values.
  // }

  function onSubmit(values: any) {
    console.log('Submitted values:', values)
    // Do something with the form values.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Начало заказа, пример: 14:00"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numExecutors"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Кол-во исполнителей"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="Адрес: Пушкина 63" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
