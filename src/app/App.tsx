import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClientProvider";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>App</div>
    </QueryClientProvider>
  );
}
