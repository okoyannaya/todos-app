import { configureStore } from '@reduxjs/toolkit'

import appStateReduser from './app-state-slice'
import todosReduser from './todos-slice';

export const store = configureStore({
  reducer: {
    todos: todosReduser,
    appState: appStateReduser,
  }
})
export type RootState = ReturnType<typeof store.getState>;