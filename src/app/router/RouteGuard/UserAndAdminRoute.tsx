import { CustomErrorForbidden } from "@/lib/errors";
import { isAuth } from "@router/isAuth";
import { redirect } from "react-router";

export function UserAndAdminRoute() {
  const result = isAuth();

  if (result === false) {
    return redirect("/auth");
  }

  //Тут тоже что-то не так с проверкой
  if (result.role.roleName !== "user" && result.role.roleName !== "admin") {
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return null;
}
