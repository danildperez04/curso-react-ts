import { useState } from "react";
import { menuItems } from "./data/db";
import { MenuItem } from "./components/MenuItem";
import { useOrder } from "./hooks/useOrder";
import { OrderContents } from "./components/OrderContents";
import { OrderTotal } from './components/OrderTotal';
import { TipPercentageForm } from './components/TipPercentageForm';

function App() {
  const [items] = useState(menuItems);

  const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder();

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de propinas y consumo</h1>
      </header>
      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div>
          <h2 className="font-black text-4xl mb-4">Menu</h2>
          <div className="space-y-5">

            {
              items.map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  addItem={addItem}
                  removeItem={removeItem}
                />
              ))
            }
          </div>
        </div>
        <div>
          <h2 className="font-black text-4xl mb-4">Consumo</h2>
          <div className="space-y-5 border rounded">
            {order.length === 0
              ? <p className="text-center">No hay elementos en el pedido</p>
              : <>
                <OrderContents
                  order={order}
                  removeItem={removeItem}
                />
                <TipPercentageForm
                  tip={tip}
                  setTip={setTip}
                />
                <OrderTotal
                  order={order}
                  tip={tip}
                  placeOrder={placeOrder}
                />
              </>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
