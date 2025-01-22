import { CustomErrorForbidden } from "@/app/Errors/CustomErrorForbidden";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { redirect } from "react-router";
import { isAuth } from "@/app/helpers/isAuth";

export default async function AdminRoute() {
  if (!(await isAuth())) {
    return redirect("/auth");
  }

  if (decryptedProfile()?.role.roleName !== "Admin") {
    //Проблема в том, что каждый переход запоминает в истории навигации, нужно что-то с этим сделать
    //Либо редирект придумать по таймауту в errorBondary (в целом редирект точно нужен мне кажется - прочёл ошибку и тебя вернуло)
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return true;
}
