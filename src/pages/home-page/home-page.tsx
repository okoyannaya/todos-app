import { useState } from "react";
import { useSelector } from "react-redux";
import { Filters } from "@components/filters";
import { TodosList } from "@components/todos-list";
import { selectActiveTodos } from "@containers/redux/selectors";
import { ITodoItem } from "@containers/redux/types";

import "./home-page.styles.css";

export const HomePage = () => {
  const activeTodos = useSelector(selectActiveTodos);
  const [filtredTodos, setFiltredTodos] = useState<ITodoItem[]>(activeTodos);

  const handleFilter = (filtered: ITodoItem[]) => {
    setFiltredTodos(filtered);
  };

  return (
    <div className="home-page">
      <Filters onFilter={handleFilter} todos={activeTodos} />
      <TodosList todos={filtredTodos} />
    </div>
  );
};
