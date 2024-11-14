import { Route, Routes } from "react-router-dom";
import { NotFound } from "@components/not-found/not-found";
import { CreateAndEditPage } from "@pages/create-and-edit-page/create-and-edit-page";
import { DeletedPage } from "@pages/deleted-page/deleted-page";
import { HomePage } from "@pages/home-page/home-page";

import { RoutersPath } from "./constants";

export const Router = () => {
  return (
    <>
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
    </>
  );
};
