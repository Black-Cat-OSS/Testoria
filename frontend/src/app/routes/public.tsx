import { RouteObject } from "react-router-dom";
import { About, Main, Processing, Login, Register } from "@pages";
import Layout from "@layouts";

const { StackLayout, CenterLayout } = Layout;

export const publicRouter: RouteObject[] = [
  {
    path: "/",
    element: <StackLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/processing",
        element: <Processing />,
      },
    ],
  },
  {
    path: "/login",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>not found</h1>,
  },
];
