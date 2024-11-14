import { useNavigate } from "react-router-dom";
import { TodoCard } from "@components/todo-card/todo-card";
import { useStorageManagement } from "@hooks/useStorageManagement";

export const HomePage = () => {
  const { getTodosFromLocalStorage } = useStorageManagement();
  const activeTodos = getTodosFromLocalStorage("activeTodos"); 
  const navigate = useNavigate();

  const switchEditeTodo = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      {activeTodos.map((item) => {
        return (
          <TodoCard
            description={item.description}
            isСompleted={item.isСompleted}
            isDelete={item.isDelete}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            id={item.id}
            handleEdit={() => {
              switchEditeTodo(item.id);
            }}
            handleDelete={() => {}}
          />
        );
      })}
    </div>
  );
};
