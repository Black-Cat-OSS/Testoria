import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { publicRouter } from "./public";
import { projectRouter } from "./project";

const RouterApp = () => {
  const router = createBrowserRouter([
    ...publicRouter,
    ...projectRouter,
  ]);

  return (
    <RouterProvider
      router={router}
    ></RouterProvider>
  );
};

export default RouterApp;
