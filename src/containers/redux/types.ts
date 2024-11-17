
export interface TodosState {
  activeTodos: ITodoItem[];
  deletedTodos: ITodoItem[];
  isSyncing: boolean;
  syncError: string | null;
}

export interface ITodoItem {
  isCompleted: boolean;
  isDelete: boolean;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
}
