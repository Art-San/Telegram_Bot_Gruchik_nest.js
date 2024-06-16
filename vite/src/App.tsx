// import { useEffect } from 'react'
// import { Routes } from './Layouts/Routes'
// import { useTelegram } from './hooks/useTelegram'
// import { useUserContext } from './context/useUser'
// import { useUser } from './pages/Auth/hooks/useUser'

// function App() {
//   const { telegramId = '721836748' } = useTelegram()
//   const { data: user, isPending } = useUser(String(telegramId))
//   const { setCurrentUser } = useUserContext()

//   useEffect(() => {
//     if (user) {
//       setCurrentUser(user)
//     }
//   }, [user, setCurrentUser])

//   console.log(isPending)
//   console.log(user)

//   if (isPending) return <div>Loading...</div>

//   return (
//     <>
//       <Routes isAuthorized={user?.isAdmin} />
//     </>
//   )
// }

// export default App

//===========================================================
// .. макет от gpt
// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import AdminLayout from './components/AdminLayout'
// import UserLayout from './components/UserLayout'
// import { useTelegram } from './hooks/useTelegram'
// import { useTelegram2 } from './hooks/useTelegram2'
// const App: React.FC = () => {
//   const { userId } = useTelegram();
//   const { setCurrentUser } = useUser();

//   const { data: user, isLoading } = useQuery(['user', userId], () => fetchUser(userId!), {
//     enabled: !!userId,
//   });

//   useEffect(() => {
//     if (user) {
//       setCurrentUser(user);
//     }
//   }, [user, setCurrentUser]);

//   if (isLoading) return <div>Loading...</div>;

//   return user?.isAdmin ? <AdminLayout /> : <UserLayout />;
// };

// export default App;
//==================================================================
// перввый макет
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

function App() {
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
