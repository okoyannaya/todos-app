import { useEffect, useState } from "react";
import { Loader } from "@components/loader/loader";
import { TodosList } from "@components/todos-list/todos-list";
import { useStorageManagement } from "@hooks/useStorageManagement";
import { RootTodos } from "src/types";

export const HomePage = () => {
  const [todos, setTodos] = useState<RootTodos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getTodosFromLocalStorage } = useStorageManagement();

  const setActiveTodos = () => {
    setIsLoading(true);
    const activeTodos = getTodosFromLocalStorage("activeTodos");
    setTodos(activeTodos);
  };

  useEffect(() => {
    setActiveTodos();
  }, []);

  return (
    <div>
      <Loader isLoading={isLoading} />
      <TodosList todos={todos} />
    </div>
  );
};
