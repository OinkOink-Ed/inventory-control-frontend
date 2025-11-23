import { memo, PropsWithChildren } from "react";
import { NavLink } from "react-router";

interface SidebarNavLinkProps extends PropsWithChildren {
  to: string;
}

export const SidebarNavLink = memo(function SidebarNavLink({
  children,
  to,
}: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
      }
    >
      {children}
    </NavLink>
  );
});
