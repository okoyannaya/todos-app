import { useSelector } from "react-redux";
import { useAppDispatch } from "@containers/redux/constants";
import {
  selectSyncError,
  syncWithLocalStorage,
} from "@containers/redux/todos-slice";

import "./sync-status.styles.css";

export const SyncStatus = () => {
  const syncError = useSelector(selectSyncError);
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(syncWithLocalStorage());
  };

  return (
    <div>
      {syncError ? (
        <div className="sync-status">
          <span>Ошибка сохранения данных, повторить:</span>
          <div className='sync-status-rerty-button' onClick={handleRetry}></div>
        </div>
      ) : (<div className="sync-status">Данные сохранены</div>)}
    </div>
  );
};
