import { ITodoItem } from "src/types";

export interface TodoFormProps {
  initialData?: ITodoItem;
  onSubmit: (taskData: ITodoItem) => void;
}
