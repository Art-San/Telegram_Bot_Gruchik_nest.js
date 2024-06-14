// Layouts
import PublicLayout from '../PublicLayout'
import AnonymousLayout from '../AnonymousLayout'
import MainLayout from '../MainLayout'

import { renderRoutes } from './renderRoutes'

// Pages
import OrdersPage from '@/pages/Orders/OrdersPage/OrdersPage'
import Login from '@/pages/Auth/Login'
import Profile from '@/pages/User/Profile'
import TestPage from '@/pages/TestPage/TestPage'

// Определение интерфейса RouteElement с обязательным свойством path
export interface RouteElement {
  name: string
  title?: string
  component?: React.ComponentType
  path: string // path обязательно
  isPublic?: boolean
  hasSiderLink?: boolean
  routes?: RouteElement[]
}

// Определение интерфейса MainRoute
export interface MainRoute {
  layout: React.ElementType
  routes: RouteElement[]
}
// profile
// Объявление массива маршрутов, соответствующего типу MainRoute[]
export const routes: MainRoute[] = [
  {
    layout: PublicLayout,
    routes: [
      {
        name: 'orders',
        title: 'Orders page',
        component: OrdersPage,
        path: '/',
        isPublic: true
      },
      {
        name: 'profile',
        title: 'Profile page',
        component: Profile,
        path: '/profile',
        isPublic: true
      }
    ]
  },
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        isPublic: true
      }
    ]
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: 'Test',
        title: 'Test page',
        component: TestPage,
        path: '/test'
      },
      {
        name: 'users',
        title: 'Users',
        hasSiderLink: true,
        path: '/test', // Добавляем path для главного маршрута "users"
        routes: [
          {
            name: 'Test_2',
            title: 'Test page 2',
            hasSiderLink: true,
            component: TestPage,
            path: '/test_2' // Убедиться, что path существует
          }
          // {
          //   name: 'create-user',
          //   title: 'Add user',
          //   hasSiderLink: true,
          //   component: CreateUser,
          //   path: '/users/new' // Убедиться, что path существует
          // }
        ]
      }
    ]
  }
]

export const Routes = renderRoutes(routes)

// export const routes = [
//   {
//     layout: AnonymousLayout,
//     routes: [
//       {
//         name: 'login',
//         title: 'Login page',
//         component: Login,
//         path: '/login',
//         isPublic: true
//       }
//     ]
//   },
//   {
//     layout: MainLayout,
//     routes: [
//       {
//         name: 'home',
//         title: 'Home page',
//         component: Home,
//         path: '/home'
//       },
//       {
//         name: 'users',
//         title: 'Users',
//         hasSiderLink: true,
//         routes: [
//           {
//             name: 'list-users',
//             title: 'List of users',
//             hasSiderLink: true,
//             component: ListUsers,
//             path: '/users'
//           },
//           {
//             name: 'create-user',
//             title: 'Add user',
//             hasSiderLink: true,
//             component: CreateUser,
//             path: '/users/new'
//           }
//         ]
//       }
//     ]
//   }
// ]
