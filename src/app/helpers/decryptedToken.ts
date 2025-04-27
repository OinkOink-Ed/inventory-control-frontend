import { AES, enc } from "crypto-ts";

interface Token {
  state: {
    token: string;
  };
}

const key = "X7pL9qW3zT2rY8mB5nK4vJ6hF1cD0aE2";

export function decryptedToken(crypt: string | null): string | null {
  if (crypt) {
    const cryptProfile = (JSON.parse(crypt) as Token).state.token;

    return AES.decrypt(cryptProfile, key).toString(enc.Utf8);
  }

  return null;
}
