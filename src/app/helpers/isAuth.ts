import { jwtDecode, JwtPayload } from "jwt-decode";

interface Auth {
  state: {
    refresh_token: string;
  };
}

export function isAuth() {
  try {
    const storedAuth = localStorage.getItem("profileStorage");

    if (!storedAuth) {
      return false;
    }

    const parsedAuth = JSON.parse(storedAuth) as Auth;
    const refreshToken = parsedAuth.state.refresh_token;

    if (!refreshToken) {
      return false;
    }

    const decoded = jwtDecode<JwtPayload>(refreshToken);

    if (!decoded.exp) {
      return false;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();

    return expirationDate < now;
  } catch (error) {
    return false;
  }
}
