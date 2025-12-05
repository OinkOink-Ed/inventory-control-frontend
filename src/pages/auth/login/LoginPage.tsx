import { Login } from "@features/auth";
import LoginSkeleton from "@/pages/auth/login/ui/LoginSkeleton";
import { Suspense } from "react";
import { Toaster } from "sonner";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <Toaster richColors />
      <Login />
    </Suspense>
  );
}
