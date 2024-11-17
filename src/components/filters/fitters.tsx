import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ITodoItem } from "@containers/redux/types";
import { ru } from "date-fns/locale";

import "./filters.styles.css";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  todos: ITodoItem[];
  onFilter: (filteredTodos: ITodoItem[]) => void;
}

export const Filters: FC<FiltersProps> = ({ todos, onFilter }) => {
  const [allTodos, setAllTodos] = useState<ITodoItem[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toString());
  const [endDate, setEndDate] = useState<string>(new Date().toString());
  const [title, setTitle] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  registerLocale("ru", ru);

  const isSameDate = (todoDate: Date, filterDate: Date) => {
    return (
      todoDate.getFullYear() === filterDate.getFullYear() &&
      todoDate.getMonth() === filterDate.getMonth() &&
      todoDate.getDate() === filterDate.getDate()
    );
  };

  const handleFilterTodos = () => {
    const filtered = allTodos.filter((todo) => {
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

  const handleResetFilters = () => {
    setFilterType("");
    setStartDate(new Date().toString());
    setEndDate(new Date().toString());
    setTitle("");
    setIsCompleted(null);
    onFilter(allTodos);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setIsCompleted(e.target.value === "" ? null : e.target.value === "true");

  const handleStartDateChange = (date: Date | null) => setStartDate((date as Date).toString());
  const handleEndDateChange = (date: Date | null) => setEndDate((date as Date).toString());
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const datePickerProps = useMemo(
    () => ({
      startDate: {
        selected: new Date(startDate),
        onChange: handleStartDateChange,
      },
      endDate: {
        selected: new Date(endDate),
        onChange: handleEndDateChange,
      },
    }),
    [startDate, endDate]
  );

  useEffect(() => {
    setAllTodos(todos);
  }, [todos]);

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
        {(filterType === "startDate" || filterType === "endDate") && (
          <div>
            <DatePicker
              locale="ru"
              dateFormat="dd/MM/yyyy"
              className="filter-picker"
              {...datePickerProps[filterType]}
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
              onChange={handleInputChange}
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
              onChange={handleSelectChange}
            >
              <option value="">Все</option>
              <option value="true">Завершенные</option>
              <option value="false">Незавершенные</option>
            </select>
          </div>
        )}
      </div>
      <div className="filters-button-group">
        <button className="filters-button" onClick={handleFilterTodos}>
          Применить фильтр
        </button>
        <button className="filters-button" onClick={handleResetFilters}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};
