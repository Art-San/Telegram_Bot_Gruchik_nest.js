// Layouts
import PublicLayout from '../PublicLayout'
import AnonymousLayout from '../AnonymousLayout'
import ProtectedLayout from '../ProtectedLayout'

import { renderRoutes } from './renderRoutes'

// Pages
import OrdersPage from '@/pages/Orders/OrdersPage/OrdersPage'
import Login from '@/pages/Auth/Login'
import Profile from '@/pages/User/Profile'

import StatisticsPageMover from '@/pages/Statistics/StatisticsPageMover'
import OrdersPageMovers from '@/pages/Orders/OrdersPage/OrdersPageMovers'
import AddOrderPage from '@/pages/AddOrderPage/AddOrderPage'

// Определение интерфейса RouteElement с обязательным свойством path
export interface RouteElement {
  name: string
  title?: string
  component?: React.ComponentType
  path: string // path обязательно
  isPublic?: boolean
  hasSideLink?: boolean
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
        title: 'Orders Movers page',
        component: OrdersPageMovers,
        path: '/',
        isPublic: true
      },
      {
        name: 'statistics',
        title: 'Statistics Mover page',
        component: StatisticsPageMover,
        path: '/statistics',
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
    layout: ProtectedLayout,
    routes: [
      {
        name: 'admin',
        title: 'Welcome page for admin',
        component: OrdersPage,
        path: '/admin'
      },
      {
        name: 'admin',
        title: 'admin',
        hasSideLink: true,
        path: '/admin',
        routes: [
          {
            name: 'page_orders_admin',
            title: 'Page Orders for admin',
            hasSideLink: true,
            component: OrdersPage,
            path: '/admin/orders'
          },
          {
            name: 'create_order',
            title: 'Add order',
            hasSideLink: true,
            component: AddOrderPage,
            path: '/admin/add_order'
          }
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
//         hasSideLink: true,
//         routes: [
//           {
//             name: 'list-users',
//             title: 'List of users',
//             hasSideLink: true,
//             component: ListUsers,
//             path: '/users'
//           },
//           {
//             name: 'create-user',
//             title: 'Add user',
//             hasSideLink: true,
//             component: CreateUser,
//             path: '/users/new'
//           }
//         ]
//       }
//     ]
//   }
// ]
