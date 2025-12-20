import LoginPage from "@/pages/auth/login/LoginPage";
import { PublicRoute } from "@router/RouteGuard";

export const authRoutes = [
  {
    path: "auth",
    element: <LoginPage />,
    loader: PublicRoute,
  },
];
