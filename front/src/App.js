import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'

import ProductList from './components/ProductList/ProductList'

import OrdersPage from './page/OrdersPage/OrdersPage'
import AddOrderPage from './components/page/AddOrderPage/AddOrderPage'
import TestPage from './page/TestPage/TestPage'

import Footer from './components/Footer/Footer'

function App() {
  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  // console.log('process.env.APP_URL', API_URL)
  return (
    <div className=" flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <Routes>
        <Route index element={<ProductList />} />.
        <Route path={'add-order'} element={<AddOrderPage />} />
        <Route path={'orders'} element={<OrdersPage />} />
        <Route path={'test'} element={<TestPage />} />
      </Routes>
      <footer className="fixed bottom-0 left-0 w-full">
        <Footer />
      </footer>
    </div>
  )
}

export default App
