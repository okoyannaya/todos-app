import { NavLink } from "react-router-dom";
import { RoutersPath } from "@containers/router/constants"

import "./navbar.styles.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="links" to={RoutersPath.PageTodos}>Мои дела</NavLink>
      <NavLink className="links" to={RoutersPath.CreateTodo}>Добавить дело</NavLink>
      <NavLink className="links" to={RoutersPath.DeletedTodos}>Корзина</NavLink>
    </nav>
  );
};
