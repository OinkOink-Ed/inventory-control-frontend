import { PublicRoute } from "@/app/router/loaders";
import { Suspense } from "react";

export const authRoutes = [
  {
    path: "auth",
    loader: PublicRoute,
    element: (
      <Suspense key="auth" fallback={<LoginSkeleton />}>
        <LoginLayout />
      </Suspense>
    ),
  },
];
