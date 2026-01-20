import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { useEffect, useState } from "react";
import type { DraftExpense, Expense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    name: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState<string>('');
  const [previousAmount, setPreviousAmount] = useState<number>(0);
  const { state, dispatch, availableBudget } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const expenseToEdit = state.expenses.find(expense => expense.id === state.editingId);

      if (expenseToEdit) {
        setExpense({
          name: expenseToEdit.name,
          amount: expenseToEdit.amount,
          category: expenseToEdit.category,
          date: expenseToEdit.date
        });
        setPreviousAmount(expenseToEdit.amount);
      }
    }
  }, [state.editingId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setExpense({
      ...expense,
      [name]: name === 'amount'
        ? Number(value)
        : value,
    });
  }

  const handleDateChange = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validacion
    if (Object.values(expense).includes('') || expense.amount <= 0 || !expense.date) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if ((expense.amount - previousAmount) > availableBudget) {
      setError('La cantidad del gasto excede el presupuesto disponible');
      return;
    }

    if (state.editingId) {
      // Actualizar gasto
      const updatedExpense: Expense = {
        ...expense,
        id: state.editingId,
      };

      dispatch({ type: 'edit-expense', payload: { expense: updatedExpense } });
    } else {
      // Agregar el gasto
      dispatch({ type: 'add-expense', payload: { expense } });
    }


    // Resetear el state
    setExpense({
      name: '',
      amount: 0,
      category: '',
      date: new Date(),
    });
    setPreviousAmount(0);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId ? 'Actualizar' : 'Nuevo'} gasto</legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-xl"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Agrega el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="name"
          value={expense.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl"
        >
          Cantidad
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Agrega la cantidad"
          className="bg-slate-100 p-2"
          name="amount"
          max={previousAmount + availableBudget}
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl"
        >
          Categoria
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="" disabled selected>-- Seleccione --</option>
          {
            categories
              .map(category => (
                <option
                  key={category.id}
                  value={category.id}
                >{category.name}</option>
              ))
          }
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="date"
          className="text-xl"
        >
          Fecha
        </label>
        <DatePicker
          id="date"
          className="bg-slate-100 p-2 border-0"
          name="date"
          value={expense.date}
          onChange={handleDateChange}
        />
      </div>
      <button className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg">{state.editingId ? 'Guardar cambios' : 'Registrar gasto'}</button>
    </form>
  )
}
