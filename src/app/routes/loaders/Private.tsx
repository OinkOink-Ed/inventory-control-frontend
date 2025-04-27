import { isAuth } from "@/app/helpers/isAuth";
import { redirect } from "react-router";

export default function PrivateRoute() {
  if (isAuth()) {
    return null; // Пользователь авторизован, продолжаем рендеринг
  }
  return redirect("/auth");
}
