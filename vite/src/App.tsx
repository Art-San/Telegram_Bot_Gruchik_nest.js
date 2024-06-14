import { Routes, Route } from 'react-router-dom'

import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { useAuthContext } from './context/AuthContext'
import { Toaster } from 'sonner'

import Login from './pages/Auth/Login'
import AddOrderPage from './pages/AddOrderPage/AddOrderPage'
import OrdersPage from './pages/Orders/OrdersPage/OrdersPage'
import TestPage from './pages/TestPage/TestPage'
import AddOrderSitePage from './pages/AddOrderPage/AddOrderSitePage'
import OrderDetails from './pages/Orders/OrdersPage/OrderDetails'
import { useUser } from './pages/Auth/hooks/useUser'

function App() {
  const { data, isPending } = useUser()
  console.log(data)
  console.log(isPending)
  return (
    <>
      <div className=" flex flex-col h-screen">
        <header>
          <Header />
        </header>
        <div className="flex flex-col items-center justify-center">
          <Routes>
            <Route index element={<ProductList />} />
            <Route path={'/orders'} element={<OrdersPage />} />
            <Route path={'/orders/:orderId'} element={<OrderDetails />} />
            <Route path={'/add_order'} element={<AddOrderPage />} />
            <Route path={'/add_order_page'} element={<AddOrderSitePage />} />
            <Route path={'/test'} element={<TestPage />} />
            <Route path={'/test_2'} element={<AddOrderSitePage />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <footer className="fixed bottom-0 left-0 w-full">
          {/* <Footer /> */}
        </footer>
      </div>
      <Toaster theme="dark" position="bottom-right" duration={1500} />
    </>
  )
}

export default App
