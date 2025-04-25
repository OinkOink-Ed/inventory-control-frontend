import { jwtDecode, JwtPayload } from "jwt-decode";

interface UserDto {
  id: number;
  name: string;
  username: string;
  password: string;
  patronimyc: string;
  role: { roleName: string };
  lastname: string;
}

export function decryptedProfile() {
  const cryptProfile = localStorage.getItem("profileStorage")
    ? localStorage.getItem("profileStorage")!
    : "";

  let profile = {
    id: 0,
    name: "",
    username: "",
    password: "",
    patronimyc: "",
    role: { roleName: "" },
    lastname: "",
  };

  try {
    profile = jwtDecode<JwtPayload>(cryptProfile).sub as unknown as UserDto;
    return profile;
  } catch (error) {
    console.log(error);
    return profile;
  }
}
