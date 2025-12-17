import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [tip, setTip] = useState(0)

  function addItem(item: MenuItem) {
    const index = order.findIndex(orderItem => orderItem.id === item.id)

    if (index === -1) {
      return setOrder([...order, { ...item, quantity: 1 }])
    }

    const newOrder = [...order]
    newOrder[index].quantity += 1

    setOrder(newOrder)
  }

  function removeItem(itemId: OrderItem['id']) {
    setOrder(order.filter(item => item.id !== itemId))
  }

  function updateQuantity(id: OrderItem['id'], quantity: number) {
    if (quantity < 1) return removeItem(id);

    const updatedOrder = order
      .map(item => (
        item.id === id
          ? { ...item, quantity }
          : item
      ));

    setOrder(updatedOrder);
  }

  function placeOrder() {
    setOrder([])
    setTip(0)
  }

  return {
    order,
    addItem,
    removeItem,
    updateQuantity,
    tip,
    setTip,
    placeOrder
  }
} 