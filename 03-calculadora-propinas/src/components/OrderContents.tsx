import { formatCurrency } from "../helpers"
import type { OrderItem } from "../types"

type OrderContentsProps = {
  order: OrderItem[],
  removeItem: (id: OrderItem['id']) => void
}

export function OrderContents({ order, removeItem }: OrderContentsProps) {
  return (
    <>
      {
        order.map(item => (
          <div key={item.id} className="w-full p-3 flex justify-between items-center border-b border-gray-300">
            <div>

              <p>{item.name} x {item.quantity}</p>
              <small>Precio: {formatCurrency(item.price)}</small>
            </div>
            <span className="font-black">{formatCurrency(item.price * item.quantity)}</span>
            <button
              className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
              onClick={() => removeItem(item.id)}>x</button>
          </div>
        ))
      }
    </ >
  )
}
