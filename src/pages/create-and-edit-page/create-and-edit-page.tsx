import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "@components/todo-form";
import { useAppDispatch } from "@containers/redux/hooks";
import { selectActiveTodos } from "@containers/redux/selectors";
import {
  addTodo,
  syncWithLocalStorage,
  updateTodo,
} from "@containers/redux/todos-slice";
import { ITodoItem } from "@containers/redux/types";

import "./create-and-edit-page.styles.css";

export const CreateAndEditPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeTodos = useSelector(selectActiveTodos);

  const title = id ? "Редактировать задачу" : "Создать задачу";
  
  const initialData = id
    ? activeTodos.find((todo) => todo.id === id)
    : undefined;

  const handleFormSubmit = (todo: ITodoItem) => {
    if (id) {
      dispatch(updateTodo(todo));
      dispatch(syncWithLocalStorage());
    } else {
      dispatch(addTodo(todo));
      dispatch(syncWithLocalStorage());
    }
    navigate("/");
  };

  return (
    <div className="create-and-edit-page">
      <h2>{title}</h2>
      <TodoForm initialData={initialData} onSubmit={handleFormSubmit} />
    </div>
  );
};
