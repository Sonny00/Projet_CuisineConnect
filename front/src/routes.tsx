import AuthGuard from "./components/authentication/AuthGuard";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import GuestGuard from "./components/authentication/GuestGuard";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

const Favoris = Loadable(lazy(() => import("./pages/Favoris")));

const Error = Loadable(lazy(() => import("./pages/404")));

// routes
const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
    
  },

   {
        path: "register",
        element: <Register />
   },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },

      {
        path: "favoris",
        element: <Favoris />,
      },
    
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
