import { UserDto } from "@/app/api/generated";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function decryptedProfile(): UserDto {
  const cryptProfile = localStorage.getItem("profileStorage")
    ? localStorage.getItem("profileStorage")!
    : "";

  let profile: UserDto = {
    id: 0,
    name: "",
    nickname: "",
    password: "",
    patronimyc: "",
    role: { roleName: "" },
    surname: "",
  };

  try {
    profile = jwtDecode<JwtPayload>(cryptProfile).sub as unknown as UserDto;
    return profile;
  } catch (error) {
    console.log(error);
    return profile;
  }
}
