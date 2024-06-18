// Layouts
import MoversLayout from '../MoversLayout'
import AnonymousLayout from '../AnonymousLayout'
import ProtectedLayout from '../ProtectedLayout'

import { renderRoutes } from './renderRoutes'

// Pages
import OrdersPage from '@/pages/Orders/OrdersPage/OrdersPage'
import Login from '@/pages/Auth/Login'
import Profile from '@/pages/User/Profile'

import StatisticsPageMover from '@/pages/History/Statistics/StatisticsPageMover'
import OrdersPageMovers from '@/pages/Orders/movers/OrdersPageMover'
import AddOrderPage from '@/pages/AddOrderPage/AddOrderPage'
import WelcomeMovers from '@/pages/WelcomePage/movers/WelcomeMovers'
import MowerHistory from '@/pages/History/mowers/MowerHistory'
import OrderDetailsMover from '@/pages/Orders/movers/OrderDetailsMover'
import OrderDetails from '@/pages/Orders/OrdersPage/OrderDetails'

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
    layout: MoversLayout,
    routes: [
      {
        name: 'welcome_mover',
        title: 'Welcome page fo Movers',
        component: WelcomeMovers,
        path: '/',
        isPublic: true
      },
      {
        name: 'orders_mover',
        title: 'Orders page fo Movers',
        component: OrdersPageMovers,
        path: '/orders',
        isPublic: true
      },
      {
        name: 'order_page_mover',
        title: 'Page order fo Movers',
        component: OrderDetailsMover,
        path: '/orders/:orderId',
        isPublic: true
      },
      {
        name: 'history_mower',
        title: 'Statistics Mover page',
        component: MowerHistory,
        path: '/history',
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
            name: 'page_orders_admin',
            title: 'Page Orders for admin',
            hasSideLink: true,
            component: OrderDetails,
            path: '/admin/orders/:orderId'
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
