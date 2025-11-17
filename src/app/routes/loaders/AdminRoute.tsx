import { CustomErrorForbidden } from "@/app/Errors/CustomErrorForbidden";
import { isAuth } from "@/app/routes/api/isAuth";
import { redirect } from "react-router";

export default function AdminRoute() {
  const result = isAuth();
  if (result === false) {
    return redirect("/auth");
  }

  if (result.role.roleName !== "admin") {
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return null;
}
