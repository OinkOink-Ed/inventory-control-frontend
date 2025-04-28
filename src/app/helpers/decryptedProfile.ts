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

export function decryptedProfile(): UserDto {
  const storedCryptProfile = localStorage.getItem("profileStorage");

  if (storedCryptProfile) {
    return jwtDecode<JwtPayload>(storedCryptProfile).sub as unknown as UserDto;
  }

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
