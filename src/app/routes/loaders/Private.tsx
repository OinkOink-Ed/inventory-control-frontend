import { redirect } from "react-router";
import { isAuth } from "../../helpers/isAuth";

export default async function PivateRoute() {
  if (await isAuth()) {
    return true;
  }

  return redirect("/auth");
}
