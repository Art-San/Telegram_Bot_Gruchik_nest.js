// src/components/SearchInput.tsx
import { FC } from 'react'
import { Search } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface SearchInputProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
}

const SearchInput: FC<SearchInputProps> = ({ setSearchTerm, searchTerm }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (str: string) => {
    setSearchTerm(str)
    const params = new URLSearchParams(location.search)
    params.set('searchTerm', str)

    navigate({ search: params.toString() })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-3xl border border-gray-700 px-3 py-0.5 flex items-center transition-colors">
        <Search className="fill-gray-300 mr-2 text-2xl transition-colors focus:not-sr-only" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Search users..."
          className="outline-border-none placeholder:text-gray-600 placeholder:text-sm block w-full bg-transparent"
        />
      </div>
    </div>
  )
}

export default SearchInput

// import { FC } from 'react'
// import { Search } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// interface SearchInputProps {
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>
//   searchTerm: string
//   // num: string
//   // setNum: (num: string) => void
// }

// const SearchInput: FC<SearchInputProps> = ({ setSearchTerm, searchTerm }) => {
//   const navigate = useNavigate()

//   const handleChange = (str: string) => {
//     setSearchTerm(str)
//     const params = new URLSearchParams(location.search)
//     params.set('searchTerm', str)

//     navigate({ search: params.toString() })
//   }

//   return (
//     <div className=" flex items-center justify-center">
//       {/* <div className="">
//         <SelectNum setNum={setNum} num={num} />
//       </div> */}
//       <div className=" rounded-3xl border border-gray-700 px-3 py-0.5 flex items-center transition-colors">
//         <Search className="fill-gray-300 mr-2 text-2xl transition-colors focus:not-sr-only" />
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(event) => handleChange(event.target.value)}
//           placeholder="Search users..."
//           className="outline-border-none  placeholder:text-gray-600 placeholder:text-sm block w-full bg-transparent"
//         />
//       </div>
//     </div>
//   )
// }

// export default SearchInput
