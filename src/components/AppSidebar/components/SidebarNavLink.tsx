import { memo, PropsWithChildren } from "react";
import { NavLink } from "react-router";

interface SidebarNavLinkProps extends PropsWithChildren {
  to: string;
  className?: string;
}

export const SidebarNavLink = memo(function SidebarNavLink({
  children,
  to,
  className = "",
}: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const baseClasses = "flex items-center gap-2";
        const activeClass = isActive ? "text-blue-600" : "text-gray-800";
        return `${baseClasses} ${activeClass} ${className}`.trim();
      }}
    >
      {children}
    </NavLink>
  );
});
