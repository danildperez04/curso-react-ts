import { useReducer, createContext, useMemo } from "react";
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  totalExpenses: number;
  availableBudget: number;
}

type BudgetProviderProps = {
  children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);

  const availableBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses, availableBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}