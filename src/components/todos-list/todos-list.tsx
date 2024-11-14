import { FC } from "react";
import { TodoCard } from "@components/todo-card/todo-card";

import { TodosListProps } from "./todos-list.types";

import "./todos-list.styles.css";

export const TodosList: FC<TodosListProps> = ({ todos }) => {
  return (
    <div className="todos-list">
      {todos.map((item) => {
        return (
          <TodoCard
            description={item.description}
            isСompleted={item.isСompleted}
            isDelete={item.isDelete}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            id={item.id}
            handleDelete={() => {}}
          />
        );
      })}
    </div>
  );
};
