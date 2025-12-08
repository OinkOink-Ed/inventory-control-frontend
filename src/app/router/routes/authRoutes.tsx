import LoginPage from "@/pages/auth/login/LoginPage";
import { PublicRoute } from "@router/guards";

export const authRoutes = [
  {
    path: "auth",
    element: <LoginPage />,
    loader: PublicRoute,
  },
];
