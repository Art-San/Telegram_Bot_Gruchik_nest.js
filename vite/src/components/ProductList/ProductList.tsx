import React, { useState } from 'react'
import './ProductList.css'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'
import { useCallback, useEffect } from 'react'
import { products } from './products'

export interface IProduct {
  id: string
  title: string
  price: number
  description: string
}

const getTotalPrice = (items: IProduct[] = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price)
  }, 0)
}

interface IData {
  userId: number
  id: number
  title: string
  completed: boolean
}
const ProductList = () => {
  const [addedItems, setAddedItems] = useState<IProduct[]>([])
  const { tg, queryId } = useTelegram()
  const [data, setData] = useState<IData>()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => setData(json))
  }, [])

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    }
    fetch('http://localhost:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, [addedItems, queryId])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData, tg])

  const onAdd = (product: IProduct) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id)
    let newItems = []

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className={'list'}>
      <h1>{data?.title}</h1>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={'item'} />
      ))}
    </div>
  )
}

export default ProductList
