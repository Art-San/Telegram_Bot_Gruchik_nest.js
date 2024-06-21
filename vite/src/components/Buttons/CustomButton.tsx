import React from 'react'
import { Link } from 'react-router-dom'

const CustomButton = ({ to, name }: { to: string; name: string }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {name}
    </Link>
  )
}

export default CustomButton
