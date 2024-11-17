import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Loader } from "@components/loader/loader";
import { Navbar } from "@components/navbar";
import { NotFound } from "@components/not-found/not-found";
import { StatusFooter } from "@components/status-footer";
import { selectIsSyncing } from "@containers/redux/selectors";
import { CreateAndEditPage } from "@pages/create-and-edit-page/create-and-edit-page";
import { DeletedPage } from "@pages/deleted-page/deleted-page";
import { HomePage } from "@pages/home-page/home-page";

import { RoutersPath } from "./constants";

export const Router = () => {
  const isSyncing = useSelector(selectIsSyncing);

  return (
    <>
      <Loader isLoading={isSyncing} />
      <Navbar />
      <Routes>
        <Route path={RoutersPath.PageTodos} element={<HomePage />} />
        <Route path={RoutersPath.CreateTodo} element={<CreateAndEditPage />} />
        <Route path={RoutersPath.DeletedTodos} element={<DeletedPage />} />
        <Route
          path={`${RoutersPath.EditTodo}/:id`}
          element={<CreateAndEditPage />}
        />
        <Route path={RoutersPath.OthersPath} element={<NotFound />} />
      </Routes>
      <StatusFooter/>
    </>
  );
};
