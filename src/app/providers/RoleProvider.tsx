import { RoleContext } from "@/app/providers/hooks/useRoleContext";
import { PropsWithChildren, useMemo, useState } from "react";

export function RoleProvider({ children }: PropsWithChildren) {
  const [profile, setProfileContext] = useState<{
    name: string | undefined;
    id: number | undefined;
    lastname: string | undefined;
    patronimyc: string | undefined;
    roleName: string | undefined;
  } | null>(null);

  const roleName = useMemo(() => profile?.roleName, [profile]);
  const id = useMemo(() => profile?.id, [profile]);
  const lastname = useMemo(() => profile?.lastname, [profile]);
  const patronimyc = useMemo(() => profile?.patronimyc, [profile]);
  const name = useMemo(() => profile?.name, [profile]);

  const value = useMemo(() => {
    return { roleName, id, lastname, patronimyc, name, setProfileContext };
  }, [roleName, id, lastname, patronimyc, name]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
