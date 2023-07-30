import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { DashboardLayout } from "../layouts";
import {
  AddChannel,
  Channels,
  EditProfile,
  ErrorBoundary,
  Login,
  MainDashboard,
  NotFound,
  PostList,
  Profile,
  Register,
  ResetPassword,
  Tags,
  ViewChannel,
  ViewPost,
} from "../pages";
import { Main } from "../pages/main";

const dashboardSections = [
  {
    path: "/dashboard",
    element: (
      <>
        <Helmet>
          <title>صفحه اصلی داشبورد</title>
        </Helmet>
        <MainDashboard />
      </>
    ),
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/profile/reset-password",
    element: (
      <>
        <Helmet>
          <title>تغییر رمز عبور</title>
        </Helmet>
        <ResetPassword />
      </>
    ),
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/channels/:channelId/posts",
    element: <PostList />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/channels/:channelId/posts/:postId",
    element: (
      <>
        <Helmet>
          <title>اطلاعات پست</title>
        </Helmet>
        <ViewPost />
      </>
    ),
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
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
        <Main />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: (
      <>
        <Helmet>
          <title>ثبت نام</title>
        </Helmet>
        <Register />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: (
      <>
        <Helmet>
          <title>ورود</title>
        </Helmet>
        <Login />
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
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
        <NotFound />
      </>
    ),
  },
]);

export default routes;
