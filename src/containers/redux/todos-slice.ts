import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoItem } from "src/types";

import { RootState } from "./store";

interface TodosState {
  activeTodos: ITodoItem[];
  deletedTodos: ITodoItem[];
  isSyncing: boolean;
  syncError: string | null;
}

const loadActiveTodosFromLocalStorage = (): ITodoItem[] => {
  const activeTodos = localStorage.getItem("activeTodos");

  return activeTodos ? JSON.parse(activeTodos) : [];
};

const loadDeletedTodosFromLocalStorage = (): ITodoItem[] => {
  const deletedTodos = localStorage.getItem("deletedTodos");

  return deletedTodos ? JSON.parse(deletedTodos) : [];
};

const initialState: TodosState = {
  activeTodos: loadActiveTodosFromLocalStorage(),
  deletedTodos: loadDeletedTodosFromLocalStorage(),
  isSyncing: false,
  syncError: null,
};

export const syncWithLocalStorage = createAsyncThunk<
  void,
  void,
  {state: RootState}
>("todos/syncWithLocalStorage", async (_, { getState, rejectWithValue }) => {
  const { activeTodos, deletedTodos } = getState().todos;

  await new Promise((resolve) => setTimeout(resolve, 500));
  if (Math.random() < 0.5) {
    return rejectWithValue("Ошибка синхронизации");
  }

  localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoItem>) => {
      state.activeTodos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.activeTodos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (index !== -1) {
        const [deletedTodo] = state.activeTodos.splice(index, 1);
        deletedTodo.isDelete = true;
        state.deletedTodos.push(deletedTodo);
      }
    },
    updateTodo: (state, action: PayloadAction<ITodoItem>) => {
      const todoIndex = state.activeTodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.activeTodos[todoIndex] = action.payload;
      }
    },
    toggleTodoCompleted: (state, action: PayloadAction<string>) => {
      const todo = state.activeTodos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    clearDeletedTodos: (state) => {
      state.deletedTodos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncWithLocalStorage.pending, (state) => {
        state.isSyncing = true;
        state.syncError = null;
      })
      .addCase(syncWithLocalStorage.fulfilled, (state) => {
        state.isSyncing = false;
      })
      .addCase(syncWithLocalStorage.rejected, (state, action) => {
        state.isSyncing = false;
        state.syncError = action.payload as string;
      });
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoCompleted,
  clearDeletedTodos,
} = todosSlice.actions;

export const selectActiveTodos = (state: RootState) => state.todos.activeTodos;
export const selectDeletedTodos = (state: RootState) =>
  state.todos.deletedTodos;
export const selectIsSyncing = (state: RootState) => state.todos.isSyncing;
export const selectSyncError = (state: RootState) => state.todos.syncError;

export default todosSlice.reducer;
