import { FC, useCallback,useEffect, useRef, useState } from "react";
import { TodoCard } from "@components/todo-card";
import { useAppDispatch } from "@containers/redux/hooks";
import { deleteTodo, handleIsSyncing,syncWithLocalStorage } from "@containers/redux/todos-slice";
import { ITodoItem } from "@containers/redux/types";
import debounce from "lodash.debounce";

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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const setArr = (newChunks: ITodoItem[]) => {
    setResultArr((prevArr) => [...prevArr, ...newChunks]);
  };

  const setNextChunk = useCallback(
    debounce(() => {
      if (chunkIdx + 1 >= tempArr.length) return; 

      dispatch(handleIsSyncing(true));
      const newChunks = tempArr[chunkIdx + 1] ?? [];

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setChunkIdx((p) => p + 1);
        setArr(newChunks);
        dispatch(handleIsSyncing(false));
      }, 300);

      setTimeoutId(newTimeoutId);
    }, 300),
    [chunkIdx, tempArr, timeoutId]
  );

  const handleScroll = () => {
    if (isSectionInViewport(refContinueElement.current) && !!resultArr.length) {
      setNextChunk();
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm("Вы действительно хотите удалить задачу?")) {
      dispatch(deleteTodo(id));
      dispatch(syncWithLocalStorage());
      const index = resultArr.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        resultArr.splice(index, 1);
      }
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
      setNextChunk.cancel(); 
      if (timeoutId) {
        clearTimeout(timeoutId); 
      }
    };
  }, [handleScroll, timeoutId, setNextChunk]);

  return (
    <div ref={ref} className="todos-list">
      {Boolean(resultArr.length) &&
        resultArr.map((item) => (
          <TodoCard
            description={item.description}
            isCompleted={item.isCompleted}
            isDelete={item.isDelete}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            id={item.id}
            key={item.id}
            handleDeleteTodo={() => handleDeleteTodo(item.id)}
          />
        ))}
      <div
        ref={refContinueElement}
        style={{ height: "40px", width: "100%", textAlign: "center" }}
      >
        Конец списка
      </div>
    </div>
  );
};
