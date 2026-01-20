import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { state, dispatch, totalExpenses, availableBudget } = useBudget();

  const percentage = useMemo(() => ((totalExpenses / state.budget) * 100), [state.budget, totalExpenses]);

  const color = `${percentage === 100
    ? '#DC2626'
    : percentage > 70
      ? '#F59E0B'
      : '#3B82F6'
    }`

  const emoji = `${percentage === 100
    ? '💀'
    : percentage > 70
      ? '😞'
      : '😊'
    }`

  const message = `${percentage > 100 || percentage < 0 ? 'Esto no deberia pasar 🔥🚨' : `${percentage.toFixed(0)}% (Gastado) ${emoji}`}`;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#F3F4F6',
            textColor: color,
            textSize: 8,
          })}
          text={message}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" onClick={() => dispatch({ type: 'reset-budget' })}>
          Resetear App
        </button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay
          label="Disponible"
          amount={availableBudget}
        />
        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </section>
  )
}
