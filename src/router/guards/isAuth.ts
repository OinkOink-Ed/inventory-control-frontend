import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../../stores/profile/useProfileStore";
import { UserDtoInterfaces } from "../../helpers/types/UserDtoInterfaces";

export function isAuth(): false | UserDtoInterfaces {
  const profile = useProfileStore.getState();
  try {
    const refreshToken = profile.refresh_token;

    const decoded = jwtDecode<JwtPayload>(refreshToken);

    if (!decoded.exp) {
      return false;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();

    if (!(now < expirationDate)) return false;

    return jwtDecode<JwtPayload>(profile.access_token)
      .sub as unknown as UserDtoInterfaces;
  } catch {
    return false;
  }
}
