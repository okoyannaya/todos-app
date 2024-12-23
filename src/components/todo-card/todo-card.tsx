import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateConversion } from "@components/helpers.ts";
import { useAppDispatch } from "@containers/redux/hooks.ts";
import {
  syncWithLocalStorage,
  toggleTodoCompleted,
} from "@containers/redux/todos-slice.ts";

import { TodoCardProps } from "./todo-card.types.ts";

import "./todo-card.styles.css";

export const TodoCard: FC<TodoCardProps> = ({
  title,
  description,
  isCompleted,
  isDelete,
  startDate,
  handleDeleteTodo,
  endDate,
  id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isCheck, setIsCheck] = useState(isCompleted);
  const startDateConversion = dateConversion(startDate);
  const endDateConversion = dateConversion(endDate);

  const handleCompletedChange = () => {
    setIsCheck(!isCheck);
    dispatch(toggleTodoCompleted(id));
    dispatch(syncWithLocalStorage());
  };

  const handleEditeTodoSwitch = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <article className="todo-card">
      <header className="todo-card__title">
        <h3>{title}</h3>
      </header>

      <section className="todo-card__info">
        <p className="todo-card__description">{description}</p>
        <div className="todo-card__time">
          <time>Дата создания: {startDateConversion}</time>
          <time>Дата завершения: {endDateConversion}</time>
        </div>
        <div className="todo-card__completed">
          <span>Выполнено: </span>
          <input
            className="todo-card__input"
            type="checkbox"
            checked={isCheck}
            onChange={handleCompletedChange}
            disabled={isDelete}
          />
        </div>
      </section>

      {!isDelete && (
        <footer className="todo-card__controls">
          <button className="todo-card__button" onClick={handleEditeTodoSwitch}>
            Редактировать
          </button>
          <button className="todo-card__button" onClick={handleDeleteTodo}>
            Удалить
          </button>
        </footer>
      )}
    </article>
  );
};
