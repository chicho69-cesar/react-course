import ItemCounter from './shopping-cart/ItemCounter'

interface ItemInCart {
  productName: string
  quantity: number
}

const productsInCart: ItemInCart[] = [
  { productName: 'Nintendo Switch 2', quantity: 1 },
  { productName: 'Pro Controller', quantity: 2 },
  { productName: 'Super Smash', quantity: 3 },
  { productName: 'Super Mario', quantity: 3 }
]

function App() {
  return (
    <>
      <h1>Carrito de compras</h1>

      {productsInCart.map((item, index) => (
        <ItemCounter
          key={index}
          name={item.productName}
          quantity={item.quantity}
        />
      ))}
    </>
  )
}

export default App
