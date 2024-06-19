import { FC } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const HelpForMovers: FC = () => {
  return (
    <>
      <div className="px-6 flex flex-col text-wrap justify-center lg:w-1/2 lg:mx-auto 2xl:w-1/3  ">
        <p>HelpForMovers</p>
        <Accordion type="single" collapsible className=" ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Откуда берется рейтинг?</AccordionTrigger>
            <AccordionContent className=" ">
              Рейтинг первоначально устанавливаться автоматически с максимальным
              значением 5 только после заполнения профиля. Профиль заполнятся в
              соответствующем разделе, находится в верхней части экрана рядом с
              историей и аватаркой пользователя.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Если низкий рейтиг, что будет?</AccordionTrigger>
            <AccordionContent>
              Если значение опустится ниже 2, удаление. За рейтингом нужно
              следить, стараться качественно выполнять свою работу.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default HelpForMovers
