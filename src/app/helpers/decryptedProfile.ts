import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";

interface UserDto {
  id: number;
  name: string;
  username: string;
  password: string;
  patronimyc: string;
  role: { roleName: string };
  lastname: string;
}

export function decryptedProfile(): UserDto {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode<JwtPayload>(storedCryptProfile).sub as unknown as UserDto;
  } catch (error) {
    return {
      id: 0,
      name: "",
      username: "",
      password: "",
      patronimyc: "",
      role: { roleName: "" },
      lastname: "",
    };
  }
}
