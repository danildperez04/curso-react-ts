import { useMemo } from "react";
import { categories } from "../data/categories"
import { formatDate } from "../helpers";
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();
  // const categoryList: Record<string, string> = categories.reduce((acc, category) => {
  //   acc[category.id] = category.name;
  //   return acc;
  // }, {} as Record<string, string>);

  const categoryInfo = useMemo(
    () => categories.find(category => category.id === expense.category),
    [expense.category]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: 'set-expense-id', payload: { id: expense.id } })}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg sm:px-4 py-5 w-full border-b border-gray-200 flex flex-row gap-5 cursor-pointer items-center">
          <div>
            <img
              src={`/icono_${categoryInfo?.icon}.svg`}
              alt={`icono gasto en ${categoryInfo?.name}`} className="sm:w-20 h-auto w-12" />
          </div>
          <div className="flex-1 sm:space-y-1">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
            <p className="text-lg">{expense.name}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
