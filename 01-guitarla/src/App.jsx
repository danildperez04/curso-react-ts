import './App.css';
import Header from './components/Header';
import Guitar from './components/Guitar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { db } from './db';
import { useCart } from './hooks/useCart';

function App() {
  const [guitars, setGuitars] = useState([]);

  // Fetch guitars
  useEffect(() => {
    setGuitars(db);
  }, [guitars]);

  const { cart, addToCart, clearCart, removeItem, updateQuantity } = useCart();

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
