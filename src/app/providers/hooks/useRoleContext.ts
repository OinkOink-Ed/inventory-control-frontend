import { createContext, useContext } from "react";

interface RoleContextProps {
  name: string | undefined;
  id: number | undefined;
  lastname: string | undefined;
  patronimyc: string | undefined;
  roleName: string | undefined;
}

export const RoleContext = createContext<RoleContextProps | null>(null);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
