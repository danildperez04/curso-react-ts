import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { db } from './db'

function App() {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    setGuitars(db)
  }, [guitars])

  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map(guitar => (
              <Guitar key={guitar.id} guitar={guitar} />
            ))
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
