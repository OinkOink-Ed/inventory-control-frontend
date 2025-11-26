import { isAuth } from "@/app/router/guards/isAuth";
import { redirect } from "react-router";

export function PublicRoute() {
  const result = isAuth();
  if (result) {
    return redirect("/");
  }
  return null;
}
