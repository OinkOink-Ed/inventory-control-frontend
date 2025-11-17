import { isAuth } from "@/app/routes/api/isAuth";
import { redirect } from "react-router";

export default function PrivateRoute() {
  const result = isAuth();
  if (result) {
    return null;
  }
  return redirect("/auth");
}
