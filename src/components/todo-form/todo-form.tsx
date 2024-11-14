import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { RootTodos } from "src/types";

import { TodoFormProps } from "./todo-form.types";

import "./todo-form.styles.css";
import "react-datepicker/dist/react-datepicker.css";

export const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit }) => {
  const [todo, setTodo] = useState<RootTodos>({
    isСompleted: false,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    isDelete: false,
    id: `${new Date()}`,
  });
  const [error, setError] = useState<string>("");
  registerLocale("ru", ru);
  useEffect(() => {
    if (initialData) {
      setTodo(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value) {
      setError("");
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setTodo((prev) => ({
        ...prev,
        endDate: new Date(date),
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      setError('Поле "Название" не должно быть пустым');

      return;
    }
    setError("");
    onSubmit(todo);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div>
        <div className="todo-form__title">
          <label className="lable">Название задачи (обязательно):</label>
          <input
            type="text"
            name="title"
            className="todo-form__input"
            value={todo.title}
            onChange={handleChange}
            placeholder="Купить в ..."
          />
          {error && <span className="error">{error}</span>}
        </div>
        <div className="todo-form__description">
          <label className="lable">Описание:</label>
          <textarea
            name="description"
            className="todo-form__textarea"
            value={todo.description}
            onChange={handleChange}
            placeholder="Хлеб, тапки ..."
          />
        </div>
      </div>

      <div className="todo-form__date">
        <div className="todo-form__date-item">
          <label className="lable">Дата создания:</label>
          <DatePicker
            selected={todo.startDate}
            onChange={handleDateChange}
            locale="ru"
            dateFormat="dd/MM/yyyy"
            showIcon
            className="piker disabled"
            readOnly
          />
        </div>
        <div className="todo-form__date-item">
          <label className="lable">Дата завершения:</label>
          <DatePicker
            selected={todo.endDate}
            onChange={handleDateChange}
            locale="ru"
            dateFormat="dd/MM/yyyy"
            showIcon
            className="piker"
          />
        </div>
        
      </div>

      <button className="todo-form__button" type="submit">
        Сохранить задачу
      </button>
    </form>
  );
};
