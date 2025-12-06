import { useMemo } from 'react';

export function Cart({ cart, clearCart, removeItem, updateQuantity }) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(() => cart
    .reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0), [cart]);

  return (
    <div id="carrito" className="bg-white p-3">
      {
        isEmpty
          ? <div className="text-center">
            <img src="/img/empty-cart.svg" alt="carrito vacio" />
            <p>Carrito vacio</p>
            <small>Agrega algo al carrito</small>
          </div>
          :
          <>
            <table className="w-100 table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  cart.map(
                    guitar => (
                      <tr key={guitar.id}>
                        <td>
                          <img
                            className="img-fluid"
                            src={`/img/${guitar.image}.jpg`}
                            alt="imagen guitarra"
                          />
                        </td>
                        <td>{guitar.name}</td>
                        <td className="fw-bold">${guitar.price}</td>
                        <td className="flex align-items-start gap-4">
                          <button onClick={() => updateQuantity(guitar.id, guitar.quantity - 1)} type="button" className="btn btn-dark">-</button>
                          {guitar.quantity}
                          <button onClick={() => updateQuantity(guitar.id, guitar.quantity + 1)} type="button" className="btn btn-dark">+</button>
                        </td>
                        <td>
                          <button onClick={() => removeItem(guitar.id)} className="btn btn-danger" type="button">
                            X
                          </button>
                        </td>
                      </tr>
                    )
                  )
                }
              </tbody>
            </table>

            <p className="text-end">
              Total pagar: <span className="fw-bold">${cartTotal}</span>
            </p>
            <button
              onClick={clearCart}
              className="btn btn-dark w-100 mt-3 p-2">
              Vaciar Carrito
            </button>
          </>
      }
    </div>
  );
}