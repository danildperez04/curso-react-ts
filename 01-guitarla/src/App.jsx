import './App.css';
import Header from './components/Header';
import Guitar from './components/Guitar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { db } from './db';

function App() {
  const [guitars, setGuitars] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setGuitars(db);
  }, [guitars]);

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

  return (
    <>
      <Header
        cart={cart}
        clearCart={clearCart}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map(guitar => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            ))
          }
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
