import { isAuth } from "@/app/helpers/isAuth";
import { redirect } from "react-router";

export default function PublicRoute() {
  if (isAuth()) {
    return redirect("/");
  }
  return false;
}
