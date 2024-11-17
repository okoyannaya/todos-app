import { FC } from "react";
import { useSelector } from "react-redux";
import { useRetryRequest } from "@components/hooks";
import { selectIsSyncing } from "@containers/redux/selectors";

import "./status-footer.styles.css";

export const StatusFooter: FC = () => {
  const { error, retry } = useRetryRequest();
  const isSyncing = useSelector(selectIsSyncing);

  const ringAnimationClass =
    isSyncing || error ? "status-badge_icon-ring-animation" : "";

  const statusColor = error ? "#ef0c0c" : "#62bd19";

  const syncSuccess = isSyncing ? "Синхронизация" : "Синхронизировано";
  const title = error || syncSuccess;

  return (
    <div className="status-badge">
      <div className="status-badge_icon">
        <div
          style={{ borderColor: statusColor }}
          className={`status-badge_icon-ring ${ringAnimationClass}`}
        />
        <div
          style={{ backgroundColor: statusColor }}
          className="status-badge_icon-dot"
        />
      </div>
      <div>
        <div className="status-badge_sync-info">
          <span>{title}</span>
          {error && (
            <button className="status-badge_retry-button" onClick={retry}>
              повторить
              <div className="status-badge_retry-button-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
