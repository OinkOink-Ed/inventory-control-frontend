import { LoginPageLazy } from "@/pages/auth";
import { PublicRoute } from "@router/RouteGuard";

export const authRoutes = [
  {
    path: "auth",
    element: <LoginPageLazy />,
    loader: PublicRoute,
  },
];
