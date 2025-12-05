import { RoleContext } from "@app-providers/RoleProvider/hooks/useRoleContext";
import { type PropsWithChildren, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useGetProfile } from "@/lib/hooks/useGetProfile";

export function RoleProvider({ children }: PropsWithChildren) {
  const { data, isSuccess } = useGetProfile();

  const value = useMemo(() => {
    return {
      roleName: data?.role?.roleName,
      id: data?.id,
      lastname: data?.lastname,
      patronimyc: data?.patronimyc,
      name: data?.name,
    };
  }, [data]);

  return isSuccess ? (
    <RoleContext value={value}>{children}</RoleContext>
  ) : (
    <Spinner />
  );
}
