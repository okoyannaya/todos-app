import { FC, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch } from "react-redux";
import { clearFilters } from "@containers/redux/todos-slice";
import { ru } from "date-fns/locale";
import { ITodoItem } from "src/types";

import "./filters.style.css";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  todos: ITodoItem[];
  onFilter: (filteredTodos: ITodoItem[]) => void;
}

const Filters: FC<FiltersProps> = ({ todos, onFilter }) => {
  const [filterType, setFilterType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toString());
  const [endDate, setEndDate] = useState<string>(new Date().toString());
  const [title, setTitle] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  const dispatch = useDispatch();

  registerLocale("ru", ru);

  const isSameDate = (todoDate: Date, filterDate: Date) => {
    return (
      todoDate.getFullYear() === filterDate.getFullYear() &&
      todoDate.getMonth() === filterDate.getMonth() &&
      todoDate.getDate() === filterDate.getDate()
    );
  };

  const filterTodos = () => {
    const filtered = todos.filter((todo) => {
      const todoStartDate = new Date(todo.startDate);
      const todoEndDate = new Date(todo.endDate);

      if (filterType === "startDate" && startDate) {
        
        return isSameDate(todoStartDate, new Date(startDate));
      }
      if (filterType === "endDate" && endDate) {

        return isSameDate(todoEndDate, new Date(endDate));
      }
      if (filterType === "title" && title) {

        return todo.title.toLowerCase().includes(title.toLowerCase());
      }
      if (filterType === "isCompleted" && isCompleted !== null) {

        return todo.isCompleted === isCompleted;
      }

      return true;
    });

    onFilter(filtered);
  };

  const resetFilters = () => {
    setFilterType("");
    setStartDate(new Date().toString());
    setEndDate(new Date().toString());
    setTitle("");
    setIsCompleted(null);
    onFilter(todos);
    dispatch(clearFilters());
  };

  return (
    <div className="filters">
      <span className="filters-header">Фильтры:</span>

      <div className="filter-group">
        <select
          className="filter-select"
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Выберите фильтр</option>
          <option value="startDate">Дата создания</option>
          <option value="endDate">Дата завершения</option>
          <option value="title">Название задачи</option>
          <option value="isCompleted">Завершено</option>
        </select>
      </div>
      <div className="filters-container">
        {filterType === "startDate" && (
          <div>
            <DatePicker
              selected={new Date(startDate)}
              onChange={(date) => setStartDate((date as Date).toString())}
              locale="ru"
              dateFormat="dd/MM/yyyy"
              className="filter-picker"
            />
          </div>
        )}

        {filterType === "endDate" && (
          <div>
            <DatePicker
              selected={new Date(endDate)}
              onChange={(date) => setEndDate((date as Date).toString())}
              locale="ru"
              dateFormat="dd/MM/yyyy"
              className="filter-picker"
            />
          </div>
        )}

        {filterType === "title" && (
          <div className="filter-group">
            <input
              className="filter-input"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название..."
            />
          </div>
        )}

        {filterType === "isCompleted" && (
          <div className="filter-group">
            <select
              className="filter-select"
              id="isCompleted"
              value={isCompleted === null ? "" : isCompleted ? "true" : "false"}
              onChange={(e) =>
                setIsCompleted(
                  e.target.value === "" ? null : e.target.value === "true"
                )
              }
            >
              <option value="">Все</option>
              <option value="true">Завершенные</option>
              <option value="false">Незавершенные</option>
            </select>
          </div>
        )}
      </div>
      <div className="filters-button-group">
        <button className="filters-button" onClick={filterTodos}>
          Применить фильтр
        </button>
        <button className="filters-button" onClick={resetFilters}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};

export default Filters;
