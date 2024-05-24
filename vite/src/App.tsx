// import './App.css'

import { Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import AddOrderPage from './pages/AddOrderPage/AddOrderPage'
import OrdersPage from './pages/OrdersPage/OrdersPage'
import TestPage from './pages/TestPage/TestPage'
import AddOrderSitePage from './pages/AddOrderPage/AddOrderSitePage'
import TestPage_2 from './pages/TestPage_2/TestPage_2'

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
            <Route path={'add_order'} element={<AddOrderPage />} />
            <Route path={'add_order_page'} element={<AddOrderSitePage />} />
            <Route path={'orders'} element={<OrdersPage />} />
            <Route path={'test'} element={<TestPage />} />
            <Route path={'test_2'} element={<TestPage_2 />} />
          </Routes>
        </div>
        <footer className="fixed bottom-0 left-0 w-full">
          {/* <Footer /> */}
        </footer>
      </div>
    </>
  )
}

export default App

// import { useEffect } from 'react'
// import { useTelegram } from './hooks/useTelegram'
// import Header from './components/Header/Header'
// import { Routes } from 'react-router-dom'

// import ProductList from './components/ProductList/ProductList'

// import OrdersPage from './page/OrdersPage/OrdersPage'
// import AddOrderPage from './page/AddOrderPage/AddOrderPage'
// import TestPage from './page/TestPage/TestPage'

// import Footer from './components/Footer/Footer'

// function App() {
//   const { tg } = useTelegram()

//   useEffect(() => {
//     // tg.ready()
//   }, [])

//   // console.log('process.env.APP_URL', API_URL)
//   return (
//     <div className=" flex flex-col h-screen">
//       <header>
//         <div className=" text-black">Header</div>
//         {/* <Header /> */}
//       </header>
//       <Routes>
//         <Route index element={<ProductList />} />.
//         <Route path={'add-order'} element={<AddOrderPage />} />
//         <Route path={'orders'} element={<OrdersPage />} />
//         <Route path={'test'} element={<TestPage />} />
//       </Routes>
//       <footer className="fixed bottom-0 left-0 w-full">
//         <div className="">Footer</div>
//         {/* <Footer /> */}
//       </footer>
//     </div>
//   )
// }

// export default App
