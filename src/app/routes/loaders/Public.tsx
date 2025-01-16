import { redirect } from "react-router";
import { isAuth } from "../../helpers/isAuth";

export default async function PublicRoute() {
  if (await isAuth()) {
    return redirect("/");
  }

  return false;
}
