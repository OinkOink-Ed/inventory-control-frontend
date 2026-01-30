import { isAuth } from "@router/isAuth";
import { redirect } from "react-router";

export function PrivateRoute() {
  const result = isAuth();
  if (result) {
    return null;
  }
  return redirect("/auth");
}
