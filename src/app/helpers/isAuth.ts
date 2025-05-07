import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";

//Похоже та самая проблема зомби
export function isAuth() {
  const profile = useProfileStore.getState();
  console.log("Вошли в auth", profile);
  try {
    const refreshToken = profile.refresh_token;

    console.log("Вошли в auth 2", refreshToken);

    const decoded = jwtDecode<JwtPayload>(refreshToken);

    console.log("Вошли в auth 3", decoded);

    if (!decoded.exp) {
      console.log("Вышли из auth 1", decoded);
      return false;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    console.log("Вошли в auth 4", expirationDate);
    const now = new Date();

    return now < expirationDate;
  } catch (error) {
    console.log("Вышли из auth 2");
    return false;
  }
}
