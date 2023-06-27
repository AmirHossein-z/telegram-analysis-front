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
import { Helmet } from "react-helmet-async";

const dashboardSections = [
  {
    path: "/dashboard/profile",
    element: (
      <>
        <Helmet>
          <title>صفحه پروفایل</title>
        </Helmet>
        <Profile />
      </>
    ),
    errorElement: <div>profile section not found</div>,
  },
  {
    path: "/dashboard/profile/edit",
    element: (
      <>
        <Helmet>
          <title>صفحه ویرایش پروفایل</title>
        </Helmet>
        <EditProfile />
      </>
    ),
    errorElement: <div>edit profile section not found</div>,
  },
  {
    path: "/dashboard/channels",
    element: (
      <>
        <Helmet>
          <title>صفحه کانال ها</title>
        </Helmet>
        <Channels />,
      </>
    ),
    errorElement: <div>channels section not found</div>,
  },
  {
    path: "/dashboard/tags",
    element: (
      <>
        <Helmet>
          <title>صفحه تگ ها</title>
        </Helmet>
        <Tags />,
      </>
    ),
    errorElement: <div>tags section not found</div>,
  },
  {
    path: "/dashboard/statistics",
    element: (
      <>
        <Helmet>
          <title>صفحه آمار</title>
        </Helmet>
        <Statistics />,
      </>
    ),
    errorElement: <div>statistics section not found</div>,
  },
];

const pages = [
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>صفحه اصلی</title>
        </Helmet>
        <MainPage />
      </>
    ),
    errorElement: <div>main page not found</div>,
  },
  {
    path: "/register",
    element: (
      <>
        <Helmet>
          <title>صفحه ثبت نام</title>
        </Helmet>
        <RegisterPage />
      </>
    ),
    errorElement: <div>register page not found</div>,
  },
  {
    path: "/login",
    element: (
      <>
        <Helmet>
          <title>صفحه ورود</title>
        </Helmet>
        <LoginPage />
      </>
    ),
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
    element: (
      <>
        <Helmet>
          <title>صفحه مورد نظر پیدا نشد!</title>
        </Helmet>
        <NotFoundPage />
      </>
    ),
  },
]);

export default routes;
