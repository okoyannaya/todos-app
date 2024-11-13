import { RootTodos } from "src/types";

export interface TodoFormProps {
    initialData?: RootTodos;
    onSubmit: (taskData: RootTodos) => void;
  }
  