import { redirect } from "react-router";
import { isAuth } from "../../helpers/isAuth";

export default async function privateRoute() {
  if (await isAuth()) {
    return true;
  }

  return redirect("/auth");
}
