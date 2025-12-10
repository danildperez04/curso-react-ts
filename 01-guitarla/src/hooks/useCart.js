import { useEffect, useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on cart change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitar) {
    // Check if the guitar already exists in the cart
    const index = cart.findIndex((item) => item.id === guitar.id);

    // If it doesn't exist, add it with quantity 1
    if (index === -1) {
      setCart([...cart, { ...guitar, quantity: 1 }]);
      return;
    }

    // If it exists, increment the quantity
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem('cart');
  }

  function removeItem(id) {
    const updatedCart = cart.filter(item => item.id !== id);

    setCart(updatedCart);
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    const updatedCart = cart
      .map(item => (
        item.id === id
          ? { ...item, quantity }
          : item
      ));

    setCart(updatedCart);
  }

  return {
    cart,
    addToCart,
    clearCart,
    removeItem,
    updateQuantity
  };
}