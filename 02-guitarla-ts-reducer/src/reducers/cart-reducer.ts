import { db } from "../data/db";
import { CartItem, Guitar } from "../types"

export type CartActions =
  { type: 'add-to-cart', payload: { item: Guitar } } |
  { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
  { type: 'increment-quantity', payload: { id: Guitar['id'] } } |
  { type: 'decrement-quantity', payload: { id: Guitar['id'] } } |
  { type: 'clear-cart' };

export type CartState = {
  data: Guitar[],
  cart: CartItem[]
}

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initalState: CartState = {
  data: db,
  cart: initialCart()
}

// const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
  state: CartState,
  action: CartActions
): CartState => {
  if (action.type === 'add-to-cart') {
    const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

    let updatedCart: CartItem[] = []

    if (itemExists) { // existe en el carrito
      updatedCart = state.cart.map(item => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
        }
        return item;
      })
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 }
      updatedCart = [...state.cart, newItem]
    }

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'remove-from-cart') {
    const updatedCart = state.cart.filter(item => item.id !== action.payload.id)

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'increment-quantity') {
    const updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'decrement-quantity') {
    const updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: []
    }
  }

  return state;
}