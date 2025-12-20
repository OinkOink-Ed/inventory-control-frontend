import { isAuth } from "@router/model/auth/isAuth";
import { redirect } from "react-router";

export function PublicRoute() {
  const result = isAuth();
  if (result) {
    return redirect("/");
  }
  return null;
}
