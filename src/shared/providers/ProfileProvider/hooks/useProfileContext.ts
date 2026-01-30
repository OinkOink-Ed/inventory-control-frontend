import type { UserControllerGetProfileQueryResponse } from "@gen-api";
import { createContext, use } from "react";

export const ProfileContext =
  createContext<UserControllerGetProfileQueryResponse | null>(null);

export const useProfileContext = () => {
  const context = use(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }
  return context;
};
