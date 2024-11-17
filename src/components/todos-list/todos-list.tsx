import { FC, useEffect, useRef, useState } from "react";
import { TodoCard } from "@components/todo-card";
import { ITodoItem } from "@containers/redux/types";

import { chunkArray, isSectionInViewport } from "./helpers";
import { TodosListProps } from "./todos-list.types";

import "./todos-list.styles.css";

const chunkSize = 15;

export const TodosList: FC<TodosListProps> = ({ todos }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refContinueElement = useRef<HTMLDivElement>(null);

  const [tempArr, setTempArr] = useState<ITodoItem[][]>([]);
  const [resultArr, setResultArr] = useState<ITodoItem[]>([]);
  const [chunkIdx, setChunkIdx] = useState(0);

  const setArr = (newChunks: ITodoItem[]) => {
    setResultArr((prevArr) => {
      const newArr = [...prevArr, ...newChunks];

      return newArr;
    });
  };

  const setNextChunk = () => {
    const newChunks = tempArr[chunkIdx + 1] ?? [];

    setChunkIdx((p) => p + 1);
    setArr(newChunks);
  };

  const handleScroll = () => {
    if (isSectionInViewport(refContinueElement.current) && !!resultArr.length) {
      setNextChunk();
    }
  };

  useEffect(() => {
    const subarray = chunkArray(todos, chunkSize);

    setTempArr(subarray);
    setResultArr(subarray[0] ?? []);
    setChunkIdx(0);
  }, [todos.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={ref} className="todos-list">
      {Boolean(resultArr.length) &&
        resultArr.map((item) => {
          return (
            <TodoCard
              description={item.description}
              isCompleted={item.isCompleted}
              isDelete={item.isDelete}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              id={item.id}
              key={item.id}
            />
          );
        })}
      <div
        ref={refContinueElement}
        style={{ height: "40px", width: "100%", textAlign: "center" }}
      >
        Конец списка
      </div>
    </div>
  );
};
