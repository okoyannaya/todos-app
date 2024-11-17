import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsSyncing } from "@containers/redux/selectors";

const disableClicksStyle = { pointerEvents: "none", userSelect: "none" };
const emptyObj = {};

export const Layout: FC<{children: ReactNode}> = ({ children }) => {
  const isSyncing = useSelector(selectIsSyncing);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isSyncing) {
      e.preventDefault();

      return false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={isSyncing ? disableClicksStyle : emptyObj}>{children}</div>
  );
};
