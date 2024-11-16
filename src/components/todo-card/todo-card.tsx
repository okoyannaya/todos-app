import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dateConversion } from "@components/helpers.ts";
import {
  deleteTodo,
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
  endDate,
  id,
}) => {
  const [isCheck, setIsCheck] = useState(isCompleted)
  const startDateConversion = dateConversion(startDate);
  const endDateConversion = dateConversion(endDate);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeCompleted = () => {
    setIsCheck(!isCheck)
    dispatch(toggleTodoCompleted(id));
  };

  const switchEditeTodo = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm("Вы действительно хотите удалить задачу?") == true) {
      dispatch(deleteTodo(id));
    } else {
      return;
    }
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
            onChange={changeCompleted}
            disabled={isDelete}
          />
        </div>
      </section>

      {!isDelete && (
        <footer className="todo-card__controls">
          <button
            className="todo-card__button"
            onClick={() => switchEditeTodo(id)}
          >
            Редактировать
          </button>
          <button
            className="todo-card__button"
            onClick={() => handleDeleteTodo(id)}
          >
            Удалить
          </button>
        </footer>
      )}
    </article>
  );
};
