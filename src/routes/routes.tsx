import { createBrowserRouter } from "react-router-dom";
import {
  DashboardPage,
  ErrorPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  RegisterPage,
} from "../pages";
import {
  Channels,
  Default,
  Profile,
  Statistics,
  Tags,
} from "../components/dashboard";
import { EditProfile } from "../components/dashboard/profile";
import { Helmet } from "react-helmet-async";
import { AddChannel, ViewChannel } from "../components/dashboard/channel";

const dashboardSections = [
  {
    path: "/dashboard",
    element: (
      <>
        <Helmet>
          <title>صفحه اصلی داشبورد</title>
        </Helmet>
        <Default />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/profile",
    element: (
      <>
        <Helmet>
          <title>پروفایل</title>
        </Helmet>
        <Profile />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/profile/edit",
    element: (
      <>
        <Helmet>
          <title>ویرایش پروفایل</title>
        </Helmet>
        <EditProfile />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/channels",
    element: (
      <>
        <Helmet>
          <title>کانال ها</title>
        </Helmet>
        <Channels />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/channels/:channelId",
    element: (
      <>
        <Helmet>
          <title>اطلاعات کانال</title>
        </Helmet>
        <ViewChannel />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/add_channel",
    element: (
      <>
        <Helmet>
          <title>افزودن کانال</title>
        </Helmet>
        <AddChannel />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/tags",
    element: (
      <>
        <Helmet>
          <title>تگ ها</title>
        </Helmet>
        <Tags />,
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/statistics",
    element: (
      <>
        <Helmet>
          <title>آمار</title>
        </Helmet>
        <Statistics />,
      </>
    ),
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <>
        <Helmet>
          <title>ثبت نام</title>
        </Helmet>
        <RegisterPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <Helmet>
          <title>ورود</title>
        </Helmet>
        <LoginPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
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
