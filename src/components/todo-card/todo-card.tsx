import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDateConversion } from "@hooks/useDateConversion.ts";

import { TodoCardProps } from "./todo-card.types.ts";

import "./todo-card.styles.css";

export const TodoCard: FC<TodoCardProps> = ({
  title,
  description,
  isСompleted,
  startDate,
  endDate,
  handleDelete,
  id
}) => {
  const [isComplete, setIsComplete] = useState(isСompleted);
  const startDateConversion = useDateConversion(startDate);
  const endDateConversion = useDateConversion(endDate);

  const navigate = useNavigate();
  
  const changeCompleted = () => {
    setIsComplete(!isComplete);
  };

  const switchEditeTodo = (id: string) => {
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
            checked={isComplete}
            onChange={changeCompleted}
          />
        </div>
      </section>

      <footer className="todo-card__controls">
        <button className="todo-card__button" onClick={()=>switchEditeTodo(id)}>
          Редактировать
        </button>
        <button className="todo-card__button" onClick={handleDelete}>
          Удалить
        </button>
      </footer>
    </article>
  );
};
