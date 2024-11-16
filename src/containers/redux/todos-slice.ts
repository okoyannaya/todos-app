import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoItem } from "src/types";

import { RootState } from "./store";

interface TodosState {
  activeTodos: ITodoItem[];
  deletedTodos: ITodoItem[];
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
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoItem>) => {
      state.activeTodos.push(action.payload);
      localStorage.setItem("activeTodos", JSON.stringify(state.activeTodos));
    },
    addTodos: (state, action: PayloadAction<ITodoItem[]>) => {
      state.activeTodos = action.payload;
    },
    clearFilters: (state) => {
      state.activeTodos = loadActiveTodosFromLocalStorage();
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
      localStorage.setItem("activeTodos", JSON.stringify(state.activeTodos));
      localStorage.setItem("deletedTodos", JSON.stringify(state.deletedTodos));
    },
    updateTodo: (state, action: PayloadAction<ITodoItem>) => {
      const todoIndex = state.activeTodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.activeTodos[todoIndex] = action.payload;
        localStorage.setItem("activeTodos", JSON.stringify(state.activeTodos));
      }
    },

    toggleTodoCompleted: (state, action: PayloadAction<string>) => {
      const todo = state.activeTodos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
      localStorage.setItem("activeTodos", JSON.stringify(state.activeTodos));
    },
    clearDeletedTodos: (state) => {
      state.deletedTodos = [];
      localStorage.setItem("deletedTodos", JSON.stringify(state.deletedTodos));
    },
  },
});

export const {
  addTodo,
  addTodos,
  clearFilters,
  deleteTodo,
  updateTodo,
  toggleTodoCompleted,
  clearDeletedTodos,
} = todosSlice.actions;

export const selectActiveTodos = (state: RootState) => state.todos.activeTodos;
export const selectDeletedTodos = (state: RootState) =>
  state.todos.deletedTodos;

export default todosSlice.reducer;
