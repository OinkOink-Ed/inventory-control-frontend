import { initHttpClient } from "@api/index.ts";
import { HttpClientContext } from "@app-providers/HttpClientProvider/HttpClientContext";
import { ProfileTokenManager } from "@features/auth";
import { useEffect, type PropsWithChildren } from "react";

export function HttpClientProvider({ children }: PropsWithChildren) {
  // useEffect(() => {
  useEffect(() => {
    console.log("повторная инициализация клиента");
  });
  initHttpClient(new ProfileTokenManager());
  // }, []);

  return <HttpClientContext value={undefined}>{children}</HttpClientContext>;
}
