import { useSelector } from "react-redux";
import { TodosList } from "@components/todos-list/todos-list";
import { selectActiveTodos } from "@containers/redux/todos-slice";

import "./home-page.style.css";

export const HomePage = () => {
  const activeTodos = useSelector(selectActiveTodos);

  return (
    <div className="home-page">
      <TodosList todos={activeTodos} />
    </div>
  );
};
