import { isAuth } from "@/app/routes/api/isAuth";
import { redirect } from "react-router";

export default function PublicRoute() {
  const result = isAuth();
  if (result) {
    return redirect("/");
  }
  return null;
}
