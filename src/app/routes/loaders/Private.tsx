import { isAuth } from "@helpers/isAuth";
import { redirect, LoaderFunction } from "react-router";

export const PrivateRoute: LoaderFunction = () => {
  if (isAuth()) {
    return null; // Пользователь авторизован, продолжаем рендеринг
  }
  return redirect("/auth");
};

export default PrivateRoute;
