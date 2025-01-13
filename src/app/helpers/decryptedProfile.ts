import { UserDto } from "@/app/api/generated";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function decryptedProfile(): UserDto | null {
  const cryptProfile = localStorage.getItem("profileStorage");

  const profile = cryptProfile
    ? (jwtDecode<JwtPayload>(cryptProfile).sub as unknown as UserDto)
    : null;

  return profile;
}
