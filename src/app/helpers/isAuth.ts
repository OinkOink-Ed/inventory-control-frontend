import { AES, enc } from "crypto-ts";

interface Auth {
  state: {
    isAuth: string;
  };
}

const key = "X7pL9qW3zT2rY8mB5nK4vJ6hF1cD0aE2";

export function isAuth() {
  const storedAuth = localStorage.getItem("authStorage");

  let result = "";

  if (storedAuth) {
    const isAuth = (JSON.parse(storedAuth) as Auth).state.isAuth;
    result = AES.decrypt(isAuth, key).toString(enc.Utf8);
  }

  if (result === "true") {
    return true;
  } else return false;
}
