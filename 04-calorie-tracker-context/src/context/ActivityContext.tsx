import React, { createContext, Dispatch, useReducer } from 'react';
import { ActivityActions, activityReducer, ActivityState, initialState } from '../reducers/activity-reducer';

type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>
}

type ActivityProviderProps = {
  children?: React.ReactNode;
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps);

export default function ActivityProvider({ children }: ActivityProviderProps) {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  )
}
