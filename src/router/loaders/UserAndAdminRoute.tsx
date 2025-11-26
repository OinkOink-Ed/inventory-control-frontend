import { CustomErrorForbidden } from "@/app/Errors/CustomErrorForbidden";
import { isAuth } from "@/app/router/guards/isAuth";
import { redirect } from "react-router";

export function UserAndAdminRoute() {
  const result = isAuth();

  if (result === false) {
    return redirect("/auth");
  }

  if (result.role.roleName !== "user" && result.role.roleName !== "admin") {
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return null;
}
