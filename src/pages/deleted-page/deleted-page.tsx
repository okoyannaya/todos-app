import { useSelector } from "react-redux";
import { SyncStatus } from "@components/sync-status/sync-status";
import { TodosList } from "@components/todos-list/todos-list";
import { useAppDispatch } from "@containers/redux/constants";
import {
  clearDeletedTodos,
  selectDeletedTodos,
  syncWithLocalStorage,
} from "@containers/redux/todos-slice";

import "./deleted-page.style.css";

export const DeletedPage = () => {
  const deletedTodos = useSelector(selectDeletedTodos);
  const dispatch = useAppDispatch();

  const handleClearTrash = () => {
    if (confirm("Вы действительно хотите очистить корзину?") == true) {
      dispatch(clearDeletedTodos());
      dispatch(syncWithLocalStorage());
    } else {
      return;
    }
  };

  return (
    <div>
      <SyncStatus />
      {deletedTodos.length !== 0 ? (
        <div className="deleted-page">
          <button className="clear-button" onClick={handleClearTrash}>
            Очистить корзину
          </button>
          <TodosList todos={deletedTodos} />
        </div>
      ) : (
        <div>Пока нет задач в корзине</div>
      )}
    </div>
  );
};
