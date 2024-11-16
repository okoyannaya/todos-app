import { useSelector } from "react-redux";
import { Loader } from "@components/loader/loader";
import { Navbar } from "@components/navbar/navbar";
import { selectIsSyncing } from "@containers/redux/todos-slice";
import { Router } from "@containers/router/router";

export const App = () => {
  const isSyncing = useSelector(selectIsSyncing);
  
return (
    <div>
      <Loader isLoading={isSyncing} />
      <Navbar />
      <Router />
    </div>
  );
};
