import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TodosList } from "@components/todos-list/todos-list";
import {
  clearDeletedTodos,
  selectDeletedTodos,
} from "@containers/redux/todos-slice";

import "./deleted-page.style.css";

export const DeletedPage = () => {
  const deletedTodos = useSelector(selectDeletedTodos);
  const dispatch = useDispatch();

  const handleClearTrash = () => {
    if (confirm("Вы действительно хотите очистить корзину?") == true) {
      dispatch(clearDeletedTodos());
    } else {
      return;
    }
  };

  return (
    <div className="deleted-page">
      {deletedTodos.length ? (
        <div>
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
