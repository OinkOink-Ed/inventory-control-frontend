import { AES } from "crypto-ts";

interface Auth {
  isAuth: string;
}

const key = "NDhjk142`+-g_G;.==1asmv";

export function isAuth() {
  const storedAuth = localStorage.getItem("profileStorage")
    ? localStorage.getItem("profileStorage")!
    : "";

  const auth = (JSON.parse(storedAuth) as Auth).isAuth;

  const result = AES.decrypt(auth, key).toString();

  if (result === "true") {
    return auth;
  } else return false;
}
