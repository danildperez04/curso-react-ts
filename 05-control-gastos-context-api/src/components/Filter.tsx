import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function Filter() {
  const { state, dispatch } = useBudget();

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="filter">Filtrar Gastos</label>
          <select
            id="filter"
            name="filter"
            className="bg-slate-100 p-3 rounded-lg flex-1"
            value={state.filterId}
            onChange={e => dispatch({ type: 'add-filter', payload: { id: e.target.value } })}
          >
            <option value="">-- Todas las categorias --</option>
            {
              categories.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                >{category.name}</option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  )
}
