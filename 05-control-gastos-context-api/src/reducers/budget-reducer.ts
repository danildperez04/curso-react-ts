import { v4 as uuidv4 } from 'uuid';
import type { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'hide-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'set-expense-id', payload: { id: Expense['id'] } } |
  { type: 'edit-expense', payload: { expense: Expense } } |
  { type: 'reset-budget' } |
  { type: 'add-filter', payload: { id: Category['id'] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
  filterId: Category['id'];
}

const initialBudget = (): number => {
  const budget = localStorage.getItem('budget');

  return budget ? Number(budget) : 0;
};

const initialExpenses = (): Expense[] => {
  const expenses = localStorage.getItem('expenses');

  return expenses ? JSON.parse(expenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: '',
  filterId: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => ({
  ...draftExpense,
  id: uuidv4()
});

export function budgetReducer(
  state: BudgetState,
  action: BudgetActions
): BudgetState {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'hide-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    }
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
    }
  }

  if (action.type === 'set-expense-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'edit-expense') {
    return {
      ...state,
      expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
      editingId: '',
      modal: false
    }
  }

  if (action.type === 'reset-budget') {
    return {
      ...state,
      budget: 0,
      expenses: [],
      modal: false
    }
  }

  if (action.type === 'add-filter') {
    return {
      ...state,
      filterId: action.payload.id
    }
  }

  return state;
}