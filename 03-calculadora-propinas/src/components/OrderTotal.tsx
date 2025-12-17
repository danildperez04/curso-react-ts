import type { OrderItem } from "../types";
import { useCallback, useMemo } from "react";
import { formatCurrency } from "../helpers";

type OrderTotalProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void
}

export function OrderTotal({ order, tip, placeOrder }: OrderTotalProps) {
  const subtotalAmount = useMemo(() => order
    .reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

  // Memoriza el resultado del calculo para evitar recalcular en cada render si sus dependencias no cambian
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount]);

  // Memoriza la funcion para que no se vuelva a crear en cada render si sus dependencias no cambian
  const totalAmount = useCallback(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:
        </h2>
        <p>Subtotal a pagar: {''}
          <span className="font-bold">
            {formatCurrency(subtotalAmount)}
          </span>
        </p>
        <p>Propina: {''}
          <span className="font-bold">
            {formatCurrency(tipAmount)}
          </span>
        </p>
        <p>Total a pagar: {''}
          <span className="font-bold">
            {formatCurrency(totalAmount())}
          </span>
        </p>
      </div>
      <button
        className="w-full bg-black p-3 uppercase   text-white font-bold mt-10 disabled:opacity-10 cursor-pointer"
        disabled={totalAmount() === 0}
        onClick={placeOrder}>Guardar orden</button>
    </>
  )
}
