import { RoleContext } from "@/app/providers/hooks/useRoleContext";
import { PropsWithChildren, useMemo } from "react";
import { useGetProfile } from "./api/useGetProfile";
import { SpinnerLoad } from "@/components/SpinnerLoad";

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

  return isSuccess && data ? (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  ) : (
    <SpinnerLoad />
  );
}
