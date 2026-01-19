import { MenuItem, OrderItem } from "../types";

export type OrderActions =
  { type: 'add-item', payload: { item: MenuItem } } |
  { type: 'remove-item', payload: { id: MenuItem['id'] } } |
  { type: 'place-order' } |
  { type: 'add-tip', payload: { value: number } }

export type OrderState = {
  order: OrderItem[],
  tip: number
}


export const initialState: OrderState = {
  order: [],
  tip: 0
};

export const orderReducer = (
  state: OrderState,
  action: OrderActions
): OrderState => {

  if (action.type === 'add-item') {
    const order = state.order;
    const item = action.payload.item;

    const itemExist = order.find(orderItem => orderItem.id === item.id)

    let updatedOrder: OrderItem[] = [];

    if (itemExist) {
      updatedOrder = order.map(orderItem => orderItem.id === item.id ?
        { ...orderItem, quantity: orderItem.quantity + 1 } :
        orderItem
      );

    } else {
      const newItem: OrderItem = { ...item, quantity: 1 };

      updatedOrder = [...order, newItem]
    }

    return {
      ...state,
      order: updatedOrder
    }
  }

  if (action.type === 'remove-item') {
    const updatedOrder = state.order.filter(item => item.id !== action.payload.id);

    return {
      ...state,
      order: updatedOrder
    }
  }

  if (action.type === 'place-order') {

    return {
      ...state,
      order: [],
      tip: 0
    }
  }

  if (action.type === 'add-tip') {
    return {
      ...state,
      tip: action.payload.value
    }
  }

  return state;
}