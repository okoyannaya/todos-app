import { RootState } from "./store";

export const selectActiveTodos = (state: RootState) => state.todos.activeTodos;

export const selectDeletedTodos = (state: RootState) => state.todos.deletedTodos;

export const selectIsSyncing = (state: RootState) => state.todos.isSyncing;

export const selectSyncError = (state: RootState) => state.todos.syncError;