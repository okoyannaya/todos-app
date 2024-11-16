import { useState } from "react";
import { useSelector } from "react-redux";
import Filters from "@components/filters/fitters";
import { SyncStatus } from "@components/sync-status/sync-status";
import { TodosList } from "@components/todos-list/todos-list";
import { selectActiveTodos } from "@containers/redux/todos-slice";
import { ITodoItem } from "src/types";

import "./home-page.style.css";

export const HomePage = () => {
  const activeTodos = useSelector(selectActiveTodos);
  const [filtredTodos, setFiltredTodos] = useState<ITodoItem[]>(activeTodos);

  const handleFilter = (filtered: ITodoItem[]) => {
    setFiltredTodos(filtered);
  };

  return (
    <div className="home-page">
      <SyncStatus/>
      
      <Filters onFilter={handleFilter} todos={activeTodos} />
      <TodosList todos={filtredTodos} />
    </div>
  );
};
