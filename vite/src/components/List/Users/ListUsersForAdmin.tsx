import { FC, useEffect, useState } from 'react'
import { useSearchUsers } from '@/pages/Users/hooks/useSearchUsers'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDebounce } from '@/pages/Users/hooks/useDebounce'
import { useSearchUsersStore } from '@/zustand/useSearchUsersStore'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page') || '1'
  const pageSize = urlParams.get('pageSize') || '10'
  const searchTerm = urlParams.get('searchTerm') || ''
  return { page, pageSize, searchTerm }
}

const ListUsersForAdmin: FC = () => {
  const {
    page,
    pageSize,
    searchTerm: initialSearchTerm
  } = getPaginationParamsFromUrl()
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm, 700)
  const [totalPages, setTotalPages] = useState<number>(1)

  const location = useLocation()
  const navigate = useNavigate()

  const { isLoading, isError, total } = useSearchUsers(
    page,
    pageSize,
    debouncedSearchTerm
  )
  const users = useSearchUsersStore((state) => state.users)

  console.log(12, users)

  useEffect(() => {
    setTotalPages(total)
  }, [total])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search)
    params.set('page', String(newPage))
    params.set('pageSize', pageSize)
    params.set('searchTerm', debouncedSearchTerm)
    navigate({ search: params.toString() })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading users</p>

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="search-input"
        />
      </div>
      <div className="">
        <ul className="bg-slate-50 flex flex-col gap-1 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto">
          {Array.isArray(users) &&
            users.map((user) => (
              <li key={user.id}>
                <p>{user?.userName}</p>
              </li>
            ))}
        </ul>

        <Pagination className="flex justify-center mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(1, Number(page) - 1))
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.min(totalPages, Number(page) + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default ListUsersForAdmin

// import { FC, useEffect, useState } from 'react'
// import { useSearchUsers } from '@/pages/Users/hooks/useSearchUsers'
// import { useUserStore } from '@/zustand/useUserStore'
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
//   PaginationEllipsis
// } from '@/components/ui/pagination'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useSearchUsersStore } from '@/zustand/useSearchUsersStore'

// function getPaginationParamsFromUrl() {
//   const urlParams = new URLSearchParams(window.location.search)
//   const page = urlParams.get('page') || '1'
//   const pageSize = urlParams.get('pageSize') || '10'
//   const searchTerm = urlParams.get('searchTerm') || ''
//   return { page, pageSize, searchTerm }
// }

// const ListUsersForAdmin: FC = () => {
//   const { page, pageSize, searchTerm } = getPaginationParamsFromUrl()
//   const [totalPages, setTotalPages] = useState<number>(1)

//   const location = useLocation()
//   const navigate = useNavigate()

//   const { isLoading, isError, total } = useSearchUsers(
//     page,
//     pageSize,
//     searchTerm
//   )
//   const users = useSearchUsersStore((state) => state.users)

//   useEffect(() => {
//     setTotalPages(total)
//   }, [total])

//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(location.search)
//     params.set('page', String(newPage))
//     params.set('pageSize', pageSize)
//     navigate({ search: params.toString() })
//   }

//   if (isLoading) return <p>Loading...</p>
//   if (isError) return <p>Error loading users</p>

//   return (
//     <>
//       <div className="">
//         <ul className="bg-slate-50 flex flex-col gap-1 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto">
//           {users &&
//             users.map((user) => (
//               <li key={user.id}>
//                 <p>{user?.userName}</p>
//               </li>
//             ))}
//         </ul>

//         <Pagination className="flex justify-center mt-4">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault()
//                   handlePageChange(Math.max(1, Number(page) - 1))
//                 }}
//               />
//             </PaginationItem>
//             {[...Array(totalPages)].map((_, i) => (
//               <PaginationItem key={i}>
//                 <PaginationLink
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault()
//                     handlePageChange(i + 1)
//                   }}
//                 >
//                   {i + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationEllipsis />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault()
//                   handlePageChange(Math.min(totalPages, Number(page) + 1))
//                 }}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </>
//   )
// }

// export default ListUsersForAdmin

// import { useSearchUsers } from '@/pages/Users/hooks/useSearchUsers'
// import { FC } from 'react'

// const ListUsersForAdmin: FC = () => {
//   const { data: users, isPending } = useSearchUsers()
//   console.log(123, ' UsersPageAdmin', users)

//   return (
//     <ul className="">
//       {Array.isArray(users) &&
//         users.map((user) => (
//           <li key={user.id}>
//             <p>{user?.userName}</p>
//           </li>
//         ))}
//     </ul>
//   )
// }

// export default ListUsersForAdmin
