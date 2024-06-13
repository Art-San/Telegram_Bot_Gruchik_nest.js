import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { validDay } from '@/utils/validDays'
import { useNavigate } from 'react-router-dom'

interface SelectDayProps {
  setDay: React.Dispatch<React.SetStateAction<string>>
  day: string
}

const SelectDay: React.FC<SelectDayProps> = ({ setDay, day }) => {
  const navigate = useNavigate()

  const handleChange = (str: string) => {
    setDay(str)
    const params = new URLSearchParams(location.search)
    params.set('days', str)

    navigate({ search: params.toString() })
  }

  return (
    <>
      <div className=" flex ">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="max-w-fit flex focus:ring-2 focus:ring-inset focus:ring-indigo-100">
            <SelectValue placeholder={validDay(day)} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="yesterday">Вчера</SelectItem>
            <SelectItem value="last7Days">Последние 7 дней</SelectItem>
          </SelectContent>
        </Select>

        {/* <div className="">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="max-w-fit flex focus:ring-2 focus:ring-inset focus:ring-indigo-100">
              <SelectValue placeholder={validDay(day)} className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="yesterday">Вчера</SelectItem>
              <SelectItem value="last7Days">Последние 7 дней</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </>
  )
}

export default SelectDay
