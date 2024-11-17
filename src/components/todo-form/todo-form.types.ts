import { ITodoItem } from "@containers/redux/types";

export interface TodoFormProps {
  initialData?: ITodoItem;
  onSubmit: (taskData: ITodoItem) => void;
}
