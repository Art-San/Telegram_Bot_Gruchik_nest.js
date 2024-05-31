import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const SelectField = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="moving">Мебель или вещи</SelectItem>
        <SelectItem value="construction">Строй мат, мусор</SelectItem>
        <SelectItem value="rigging">Пианино, сейф</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectField
