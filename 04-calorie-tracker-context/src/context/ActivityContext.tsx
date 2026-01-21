import React, { createContext, Dispatch, useMemo, useReducer } from 'react';
import { ActivityActions, activityReducer, ActivityState, initialState } from '../reducers/activity-reducer';

type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>,
  caloriesConsumed: number,
  caloriesBurned: number,
  netCalories: number,
}

type ActivityProviderProps = {
  children?: React.ReactNode;
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps);

export default function ActivityProvider({ children }: ActivityProviderProps) {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const { activities } = state;

  // Contadores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

  return (
    <ActivityContext.Provider value={{ state, dispatch, caloriesConsumed, caloriesBurned, netCalories }}>
      {children}
    </ActivityContext.Provider>
  )
}
