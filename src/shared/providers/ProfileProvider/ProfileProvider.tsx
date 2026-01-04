import { type PropsWithChildren, useMemo } from "react";
import { useGetProfile } from "@/lib/hooks/useGetProfile";
import { ProfileContext } from "@/shared/providers/ProfileProvider/hooks/useProfileContext.ts";

export function ProfileProvider({ children }: PropsWithChildren) {
  const { data } = useGetProfile();

  const value = useMemo(() => {
    return {
      role: data.role,
      id: data.id,
      lastname: data.lastname,
      patronimyc: data.patronimyc,
      name: data.name,
    };
  }, [data]);

  return <ProfileContext value={value}>{children}</ProfileContext>;
}
