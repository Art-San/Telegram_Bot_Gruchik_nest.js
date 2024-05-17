import { useEffect } from 'react'
// import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form/Form'
import ProductList from './components/ProductList/ProductList'
import { TestPage } from './components/TestPage/TestPage'

function App() {
  // 26:00
  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />.
        <Route path={'form'} element={<Form />} />
        <Route path={'test'} element={<TestPage />} />
      </Routes>
    </div>
  )
}

export default App
