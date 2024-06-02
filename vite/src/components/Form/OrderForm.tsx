import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateOrder } from '@/pages/Orders/hooks/useCreateOrder'

const formSchema = z.object({
  startTime: z.string().min(1, {
    message: 'Не должно быть пустым'
  }),
  numExecutors: z.string().min(1, { message: 'Не должно быть пустым' }),
  typeWork: z.string().min(1, { message: 'Выберите вариант' }),
  address: z.string().min(1, { message: 'Не должно быть пустым' }),
  text: z
    .string()
    .min(10, {
      message: 'Не менее 10 символов.'
    })
    .max(160, {
      message: 'Не длиннее 160 символов.'
    }),
  hourCost: z.string().min(1, { message: 'Не должно быть пустым' })
})

export function OrderForm() {
  const { createOrder, isPending } = useCreateOrder()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '',
      numExecutors: '',
      typeWork: '',
      address: '',
      text: '',
      hourCost: ''
    }
  })

  const { reset } = form

  function parseNumber(value: string) {
    return value ? parseInt(value, 10) : null
  }

  function onSubmit(formData: any) {
    const transformedData = {
      ...formData,
      authorId: '721836748',
      authorName: 'Admin',
      numExecutors: parseNumber(formData.numExecutors),
      hourCost: parseNumber(formData.hourCost)
    }

    createOrder(transformedData)

    reset({
      startTime: '',
      numExecutors: '',
      typeWork: '',
      address: '',
      text: '',
      hourCost: ''
    })
  }

  return (
    <div className="m-0 w-[330px] flex flex-col  justify-center text-slate-700">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Время</FormLabel>
                {/* <FormLabel className="sr-only">Время</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Начало заказа, пример: 15:00"
                    type="text"
                    // disabled={emailSignIn.isPending}
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
            name="typeWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вид работ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите один из вариантов" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="moving">Мебель или вещи</SelectItem>
                    <SelectItem value="construction">
                      Строй мат, мусор
                    </SelectItem>
                    <SelectItem value="rigging">Пианино, сейф</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
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
                  <Input placeholder="Пушкина 63" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Дополнительная инфа"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* You can <span>@mention</span> other users and organizations. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hourCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Стоимость часа</FormLabel>
                <FormControl>
                  <Input placeholder="350" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Отправка
          </Button>
        </form>
      </Form>
    </div>
  )
}
