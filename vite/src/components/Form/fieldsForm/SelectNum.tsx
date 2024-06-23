import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { validDay } from '@/utils/validDays'
import { useNavigate } from 'react-router-dom'

interface SelectNumProps {
  setNum: React.Dispatch<React.SetStateAction<string>>
  num: string
}

const SelectNum: React.FC<SelectNumProps> = ({ setNum, num }) => {
  const navigate = useNavigate()

  const handleChange = (str: string) => {
    setNum(str)
    const params = new URLSearchParams(location.search)
    params.set('pageSize', str)
    navigate({ search: params.toString() })
  }

  return (
    <>
      <div className="flex">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="max-w-fit flex focus:ring-2 focus:ring-inset focus:ring-indigo-100">
            <SelectValue placeholder={num} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default SelectNum

// import { FC } from 'react'
// interface SelectNumProps {
//   num: string
//   setNum: React.Dispatch<React.SetStateAction<string>>
// }

// const SelectNum: FC<SelectNumProps> = ({ num, setNum }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setNum(event.target.value)
//   }

//   return (
//     <select value={num} onChange={handleChange}>
//       <option value="10">10</option>
//       <option value="20">20</option>
//       <option value="50">50</option>
//       <option value="100">100</option>
//     </select>
//   )
// }

// export default SelectNum
