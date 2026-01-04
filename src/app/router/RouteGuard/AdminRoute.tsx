import { CustomErrorForbidden } from "@/lib/errors";
import { isAuth } from "@router/isAuth";
import { redirect } from "react-router";

export function AdminRoute() {
  const result = isAuth();
  if (!result) {
    return redirect("/auth");
  }

  //Какой-то вопрос я хотел тут решить
  if (result.role.roleName !== "admin") {
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return null;
}
