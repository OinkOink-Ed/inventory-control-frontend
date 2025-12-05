export type Answer = "logout" | "reset";

export const ANSWER = {
  LOGOUT: "logout" as Answer,
  RESET: "reset" as Answer,
} as const;
