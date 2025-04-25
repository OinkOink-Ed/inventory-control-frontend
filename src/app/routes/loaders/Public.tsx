import { redirect, LoaderFunction } from "react-router";
import { isAuth } from "../../helpers/isAuth";

export const PublicRoute: LoaderFunction = async () => {
  if (await isAuth()) {
    return redirect("/");
  }
  return null;
};

export default PublicRoute;
