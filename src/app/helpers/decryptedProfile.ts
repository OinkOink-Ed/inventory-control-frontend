import { UserDto } from "@/app/api/generated";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function decryptedProfile(): UserDto {
  const cryptProfile = localStorage.getItem("profileStorage")
    ? localStorage.getItem("profileStorage")!
    : "";

  const profile = jwtDecode<JwtPayload>(cryptProfile).sub as unknown as UserDto;

  return profile;
}
