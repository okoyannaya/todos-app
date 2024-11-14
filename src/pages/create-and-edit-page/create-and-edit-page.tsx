import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "@components/todo-form/todo-form";
import { addTodo, selectActiveTodos, updateTodo } from "@containers/redux/todos-slice";
import { ITodoItem } from "src/types";

import "./create-and-edit-page.styles.css";

export const CreateAndEditPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeTodos = useSelector(selectActiveTodos);


  const initialData = id ? activeTodos.find((todo) => todo.id === id) : undefined;

  const handleFormSubmit = (todo: ITodoItem) => {
    if (id) {
      dispatch(updateTodo(todo));
      console.log("Обновление задачи:", todo);
    } else {
      dispatch(addTodo(todo));
      console.log("Создание новой задачи:", todo);
    }
    navigate("/");
  };

  return (
    <div className="create-and-edit-page">
      <h2>{id ? "Редактировать задачу" : "Создать задачу"}</h2>
      <TodoForm initialData={initialData} onSubmit={handleFormSubmit} />
    </div>
  );
};
