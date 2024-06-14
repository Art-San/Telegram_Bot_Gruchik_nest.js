import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ProtectedRouteProps } from '../../types'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isPublic,
  isAuthorized,
  redirectTo,
  children
}) => {
  const location = useLocation()
  const from = location.pathname // текущий путь, который пользователь пытался посетить

  if (!isPublic && !isAuthorized) {
    return <Navigate to="/login " state={{ from }} /> // — здесь state сохраняет путь, который пользователь пытался посетить (from), перед перенаправлением на страницу логина.
  }
  if (isPublic && isAuthorized) {
    const redirectPath = location.state?.from || redirectTo
    return <Navigate to={redirectPath} />
  }
  return <>{children}</>
}

export default ProtectedRoute
