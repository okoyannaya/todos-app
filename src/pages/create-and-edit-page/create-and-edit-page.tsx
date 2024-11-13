import { useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "@components/todo-form/todo-form";
import { useStorageManagement } from "@hooks/useStorageManagement";
import { RootTodos } from "src/types";


export const CreateAndEditPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { saveTodoToLocalStorage } = useStorageManagement()
  const initialData = id ? todos.find((todo) => todo.id === id) : undefined;

  const handleFormSubmit = (todo: RootTodos) => {
    if (id) {
      saveTodoToLocalStorage(todo);
      console.log("Обновление задачи:", todo);
    } else {
      saveTodoToLocalStorage(todo);
      console.log("Создание новой задачи:", todo);
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Редактировать задачу" : "Создать задачу"}</h2>
      <TodoForm initialData={initialData} onSubmit={handleFormSubmit} />
    </div>
  );
};
