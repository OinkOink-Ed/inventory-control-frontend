import { Toaster } from "sonner";
import { Login } from "../pages/auth/Login";

export default function LoginLayout() {
  return (
    <>
      <Toaster richColors />
      <Login />
    </>
  );
}
