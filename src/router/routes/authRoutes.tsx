import LoginPage from "@/pages/auth/login/LoginPage";
import { AuthLayout } from "@app/layouts";
import { PublicRoute } from "@router/loaders";

export const authRoutes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        loader: PublicRoute,
      },
    ],
  },
];
