import { QueryClient } from "@tanstack/react-query";

export const queryClientInstans = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      retry: false,
    },
  },
});
