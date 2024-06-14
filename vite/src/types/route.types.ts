import React from 'react'

export interface RouteElement {
  name: string
  title?: string
  component?: React.ComponentType
  path: string
  isPublic?: boolean
  hasSiderLink?: boolean
  routes?: RouteElement[]
}

export interface MainRoute {
  layout: React.ElementType
  routes: RouteElement[]
}

export interface ProtectedRouteProps {
  isPublic: boolean
  isAuthorized: boolean
  redirectTo: string
  children: React.ReactNode // Добавляем свойство children
}
