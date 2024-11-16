import { FC, useEffect, useRef, useState } from "react";
import { TodoCard } from "@components/todo-card/todo-card";
import { ITodoItem } from "src/types";

import { TodosListProps } from "./todos-list.types";

import "./todos-list.styles.css";

const chunkSize = 15;

function isSectionInViewport(el?: Element | null): boolean {
  if (!el) return false;

  const rect = el.getBoundingClientRect();

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const chunkArray = (array: ITodoItem[], size: number): ITodoItem[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const TodosList: FC<TodosListProps> = ({ todos }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refContinueElement = useRef<HTMLDivElement>(null);

  const [tempArr, setTempArr] = useState<ITodoItem[][]>([]);
  const [resultArr, setResultArr] = useState<ITodoItem[]>([]);
  const [chunkIdx, setChunkIdx] = useState(0);

  const itemSet = useRef<Set<string>>(new Set());

  const setArr = (newChunks: ITodoItem[]) => {
    setResultArr((prevArr) => {
      const newArr = [...prevArr, ...newChunks];

      return newArr;
    });
  };

  const setNextChunk = () => {
    setChunkIdx((p) => p + 1);
    const newChunks = tempArr[chunkIdx + 1] ?? [];
    console.log("setChunk", chunkIdx + 1);
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
    itemSet.current.clear();
    setChunkIdx(0);
    subarray[0]?.forEach((item) => itemSet.current.add(item.id));
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
              handleDelete={() => {}}
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
