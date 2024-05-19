import { IProduct } from '../ProductList/ProductList'
import { Button } from '../ui/button'
import './ProductItem.css'

interface iProps {
  product: IProduct
  className: string
  onAdd: (product: IProduct) => void
}

const ProductItem = ({ product, className, onAdd }: iProps) => {
  const onAddHandler = () => {
    onAdd(product)
  }

  return (
    <div className={'product ' + className}>
      <div className={'img'} />
      <div className={'title'}>{product.title}</div>
      <div className={'description'}>{product.description}</div>
      <div className={'price'}>
        <span>
          Стоимость: <b>{product.price}</b>
        </span>
      </div>
      <Button size={'lg'} className="p-7 bg-slate-700" onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </div>
  )
}

export default ProductItem
