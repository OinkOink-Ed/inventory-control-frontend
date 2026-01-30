import { Login } from "@features/auth";
import LoginSkeleton from "@/pages/auth/ui/LoginSkeleton";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";

export const LoginPageLazy = lazy(() => import("@/pages/auth/ui/LoginPage"));

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <Toaster richColors />
      <Login />
    </Suspense>
  );
}
