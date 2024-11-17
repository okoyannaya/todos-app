import { useSelector } from "react-redux";
import { TodosList } from "@components/todos-list/todos-list";
import { useAppDispatch } from "@containers/redux/hooks";
import { selectDeletedTodos } from "@containers/redux/selectors";
import {
  clearDeletedTodos,
  syncWithLocalStorage,
} from "@containers/redux/todos-slice";

import "./deleted-page.styles.css";

export const DeletedPage = () => {
  const dispatch = useAppDispatch();
  const deletedTodos = useSelector(selectDeletedTodos);

  const handleClearTrash = () => {
    if (confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearDeletedTodos());
      dispatch(syncWithLocalStorage());
    } else return;
  };

  return (
    <div className="deleted-page">
      {deletedTodos.length ? (
        <div >
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
