import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RootTodos } from "src/types";

import { TodoFormProps } from "./todo-form.types";

import "./todo-form.styles.css";

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
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      endDate: new Date(e.target.value),
    }));
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
      <div className="todo-form__title">
        <label>Название задачи (обязательно):</label>{" "}
        <input
          type="text"
          name="title"
          className="todo-form__input"
          value={todo.title}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
      </div>

      <div>
        <label>Описание:</label>{" "}
        <textarea
          name="description"
          className="todo-form__textarea"
          value={todo.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          Дата создания:
          <input
            type="text"
            value={todo.startDate.toLocaleDateString()}
            readOnly
          />
        </label>
      </div>

      <div>
        <label>
          Дата завершения:
          <input
            type="date"
            value={todo.endDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </label>
      </div>

      <button type="submit">Сохранить задачу</button>
    </form>
  );
};
