import { CustomErrorForbidden } from "@/app/Errors/CustomErrorForbidden";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";

export default function AdminRoute() {
  if (decryptedProfile()?.role.roleName === "Admin") {
    //Проблема в том, что каждый переход запоминает в истории навигации, нужно что-то с этим сделать
    //Либо редирект придумать по таймауту в errorBondary (в целом редирект точно нужен мне кажется - прочёл ошибку и тебя вернуло)
    const error = new CustomErrorForbidden("Нет доступа к странице!", 403);
    throw error;
  }

  return null;
}
