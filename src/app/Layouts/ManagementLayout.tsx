import { PropsWithChildren } from "react";

export function ManagementLayout({ children }: PropsWithChildren) {
  // TODO Базовые стили Админ панели
  return <main className="flex h-svh w-full">{children}</main>;
}
