
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Filters from "@components/filters/fitters";
import { TodosList } from "@components/todos-list/todos-list";
import { addTodos, selectActiveTodos } from "@containers/redux/todos-slice";
import { ITodoItem } from "src/types";

import "./home-page.style.css";

export const HomePage = () => {
  const activeTodos = useSelector(selectActiveTodos);
  const dispatch = useDispatch()

  const handleFilter = (filtered: ITodoItem[]) => {
    dispatch(addTodos(filtered))
  };
  


  return (
    <div className="home-page">
      <Filters onFilter={handleFilter} todos={activeTodos}/>
      <TodosList todos={activeTodos} />
    </div>
  );
};
