import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";

export function isAuth() {
  const profile = useProfileStore.getState();
  try {
    const refreshToken = profile.refresh_token;

    const decoded = jwtDecode<JwtPayload>(refreshToken);

    if (!decoded.exp) {
      return false;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();

    return now < expirationDate;
  } catch (error) {
    return false;
  }
}
