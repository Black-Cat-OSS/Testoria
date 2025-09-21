import { RouteObject } from "react-router-dom";
import { Project } from "@pages";
import Layout from "@layouts";

const { ProjectFileViewLayout, CenterLayout, FluidLayout } =
  Layout;

export const projectRouter: RouteObject[] = [
  {
    path: "/:id",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Project.Main />,
      },
    ],
  },
  {
    path: "/:id",
    element: <ProjectFileViewLayout />,
    children: [
      {
        path: "code",
        element: <Project.Explorer />,
      },
    ],
  },
  {
    path: "/:id",
    element: <FluidLayout />,
    children: [
      {
        path: "container",
        element: <Project.ContainerControll />,
      },
    ],
  },
  {
    path: "project",
    element: <CenterLayout />,
    children: [
      {
        path: "add",
        element: <Project.Add />,
      }
    ],
  },
  {
    path: "*",
    element: <h1>project not found</h1>,
  },
];
