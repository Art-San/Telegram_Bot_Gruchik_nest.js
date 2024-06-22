import { ChangeEvent, FC } from 'react'

interface ISearchField {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ handleSearch, searchTerm }) => {
  return (
    <div className=" border-e-red-50">
      <input placeholder="Search" value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

export default SearchField
