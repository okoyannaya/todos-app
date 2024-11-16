import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsSyncing } from "@containers/redux/todos-slice";
import { RoutersPath } from "@containers/router/constants"

import "./navbar.styles.css";

export const Navbar = () => {
  const isSyncing = useSelector(selectIsSyncing);

  return (
    <nav className="navbar" style={isSyncing ? { pointerEvents: 'none' } : {}} >
      <NavLink className="links" to={RoutersPath.PageTodos}>Мои дела</NavLink>
      <NavLink className="links" to={RoutersPath.CreateTodo}>Добавить дело</NavLink>
      <NavLink className="links" to={RoutersPath.DeletedTodos}>Корзина</NavLink>
    </nav>
  );
};
