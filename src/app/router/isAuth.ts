import { useProfileStore } from "@features/auth";
import { jwtDecode } from "jwt-decode";

export function isAuth(): boolean {
  const profile = useProfileStore.getState();
  try {
    const refreshToken = profile.refresh_token;

    const decoded = jwtDecode(refreshToken);

    if (!decoded.exp) {
      return false;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();

    if (!(now < expirationDate)) return false;

    return true;
  } catch {
    return false;
  }
}
