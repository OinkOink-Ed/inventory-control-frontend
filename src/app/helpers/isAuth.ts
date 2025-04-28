import { AES, enc } from "crypto-ts";

interface Auth {
  state: {
    isAuth: string;
  };
}

const key = "X7pL9qW3zT2rY8mB5nK4vJ6hF1cD0aE2";

export function isAuth() {
  let result;
  try {
    const storedAuth = localStorage.getItem("authStorage");
    let isAuth = "";
    if (storedAuth) {
      isAuth = (JSON.parse(storedAuth) as Auth).state.isAuth;
    }
    result = AES.decrypt(isAuth, key).toString(enc.Utf8);
  } catch (error) {
    return false;
  }

  if (result === "true") {
    return true;
  }
}
