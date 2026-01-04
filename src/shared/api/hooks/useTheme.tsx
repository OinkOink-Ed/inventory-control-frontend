import type { ThemeProviderState } from "@api/hooks/theme-provider.tsx";
import { createContext, use } from "react";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  return context;
};
