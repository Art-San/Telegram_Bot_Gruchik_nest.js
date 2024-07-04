import React from 'react'
import { Link } from 'react-router-dom'

const CustomButton = ({
  to,
  name,
  className
}: {
  to: string
  name: string
  className?: string
}) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {name}
    </Link>
  )
}

{
  /* <CustomButtonLink
name={'Создать'}
to="/add_order"
className="text-primary underline-offset-4 hover:underline"
/> */
}

export default CustomButton

// import React from 'react'
// import { Link } from 'react-router-dom'

// const CustomButtonLink = ({
//   to,
//   name,
//   className
// }: {
//   to: string
//   name: string
//   className: string
// }) => {
//   return (
//     <Link to={to} className={className}>
//       {name}
//     </Link>
//   )
// }

// export default CustomButtonLink
