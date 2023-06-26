import { createBrowserRouter } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  RegisterPage,
} from "../pages";
import { Channels, Profile, Statistics, Tags } from "../components/dashboard";
import { EditProfile } from "../components/dashboard/profile";

const dashboardSections = [
  {
    path: "/dashboard/profile",
    element: <Profile />,
    errorElement: <div>profile section not found</div>,
  },
  {
    path: "/dashboard/profile/edit",
    element: <EditProfile />,
    errorElement: <div>edit profile section not found</div>,
  },
  {
    path: "/dashboard/channels",
    element: <Channels />,
    errorElement: <div>channels section not found</div>,
  },
  {
    path: "/dashboard/tags",
    element: <Tags />,
    errorElement: <div>tags section not found</div>,
  },
  {
    path: "/dashboard/statistics",
    element: <Statistics />,
    errorElement: <div>statistics section not found</div>,
  },
];

const pages = [
  {
    path: "/",
    element: <MainPage />,
    errorElement: <div>main page not found</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <div>register page not found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>login page not found</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <div>dashboard page not found</div>,
    children: [...dashboardSections],
  },
];

const routes = createBrowserRouter([
  ...pages,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
