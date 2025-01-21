import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstans } from "./queryClientInstans";
import { AppLayout } from "./Layouts/AppLayout";
import { LoginLayout } from "./Layouts/LoginLayout";

export function App() {
  return (
    <QueryClientProvider client={queryClientInstans}>
      <LoginLayout />
      <AppLayout />
    </QueryClientProvider>
  );
}
