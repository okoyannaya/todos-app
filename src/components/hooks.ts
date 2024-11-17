import { useSelector } from "react-redux";
import { useAppDispatch } from "@containers/redux/hooks";
import { selectSyncError } from "@containers/redux/selectors";
import { syncWithLocalStorage } from "@containers/redux/todos-slice";

export const useRetryRequest = () => {
  const error = useSelector(selectSyncError);
  const dispatch = useAppDispatch();

  const retry = () => {
    dispatch(syncWithLocalStorage());
  };

  return { error, retry };
};
