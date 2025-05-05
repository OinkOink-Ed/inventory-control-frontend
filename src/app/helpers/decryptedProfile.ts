import { jwtDecode, JwtPayload } from "jwt-decode";

interface Auth {
  state: {
    refresh_token: string;
  };
}

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
  try {
    const storedCryptProfile = localStorage.getItem("profileStorage");

    if (!storedCryptProfile) {
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

    const result = (JSON.parse(storedCryptProfile) as Auth).state.refresh_token;
    return jwtDecode<JwtPayload>(result).sub as unknown as UserDto;
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
