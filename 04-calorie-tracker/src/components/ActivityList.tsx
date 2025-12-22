import { useMemo } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[],
  dispatch: React.Dispatch<ActivityActions>
}
export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  const categoryName = useMemo(
    () => {
      return (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
    },
    []
  )

  const isEmpty = useMemo(() => activities.length === 0, [activities]);

  return isEmpty
    ? (<p className="text-center">No hay actividades aun...</p>)
    : (
      <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
        {
          activities.map(activity => (
            <article
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
            >
              <div className="space-y-2 relative">
                <p className={`absolute px-10 py-2 -top-8 -left-8 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(+activity.category)}</p>
                <p className="text-2xl font-bold pt-5">
                  {activity.name}
                </p>
                <p className="font-black text-4xl text-lime-500">{activity.calories} {''}<span>Calorias</span></p>
              </div>
              <div className="flex gap-5 items-center">
                <button
                  className="cursor-pointer"
                  onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                >
                  <PencilSquareIcon className="h-8 w-8 text-gray-800" /></button>
                <button
                  className="cursor-pointer"
                  onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                >
                  <XCircleIcon className="h-8 w-8 text-red-500" /></button>
              </div>
            </article>
          ))
        }
      </>
    )
}
