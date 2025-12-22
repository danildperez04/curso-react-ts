import { useEffect, useState, type Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuid } from "uuid";

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState = {
  id: uuid(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => (stateActivity.id === state.activeId))[0];

      // @ts-expect-error
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'save-activity', payload: { newActivity: activity } })

    setActivity({
      ...initialState,
      id: uuid()
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id: key, value } = e.target;

    const isNumberField = ['category', 'calories'].includes(key);

    setActivity({
      ...activity,
      [key]: isNumberField ? +value : value
    });
  }

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="category">Categoria: </label>
        <select
          className="border border-slate-300 px-4 py-2 rounded-lg"
          name=""
          id="category"
          value={activity.category}
          onChange={handleChange}>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="name">Actividad: </label>
        <input
          className="border border-slate-300 px-4 py-2 rounded-lg"
          type="text"
          id="name"
          placeholder="Ej.Comida, Jugo de Naranaja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="calories">Calorias: </label>
        <input
          className="border border-slate-300 px-4 py-2 rounded-lg"
          type="number"
          id="calories"
          placeholder="Ej. 300"
          value={activity.calories}
          onChange={handleChange} />
      </div>
      <button
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        type="submit"
        disabled={!isValidActivity()}>
        Guardar {activity.category === 1 ? 'Comida' : 'Ejercicio'}
      </button>
    </form>
  )
}
