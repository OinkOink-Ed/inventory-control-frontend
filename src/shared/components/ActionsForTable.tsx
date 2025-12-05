import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRoleContext } from "@app-providers/RoleProvider/hooks/useRoleContext";
import { useDialogFormShow } from "@/app/stores/dialogFormShow/useDialogFormShow";
import { memo, useMemo } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const ActionsForTable = memo(function ActionsForTable() {
  const toggleShow = useDialogFormShow((state) => state.toggleDialogForm);

  const { roleName } = useRoleContext();
  const baseActions = useMemo(
    () => [
      <Button
        key={"Выдача картриджей"}
        variant={"outline"}
        className="w-full border-none"
        onClick={() => {
          toggleShow("delivery");
        }}
      >
        Выдать картриджи
      </Button>,
      <Button
        key={"Списание картриджей"}
        variant={"outline"}
        className="w-full border-none"
        onClick={() => {
          toggleShow("decommissioning");
        }}
      >
        Списать картриджи
      </Button>,
    ],
    [toggleShow],
  );

  const adminActions = useMemo(
    () => [
      <Button
        key={"Приём картриджей"}
        variant={"outline"}
        className="w-full border-none"
        onClick={() => {
          toggleShow("receiving");
        }}
      >
        Принять картриджи
      </Button>,
      <Button
        key={"Перемещение картриджей"}
        variant={"outline"}
        className="w-full border-none"
        onClick={() => {
          toggleShow("movement");
        }}
      >
        Переместить картриджи
      </Button>,
    ],
    [toggleShow],
  );

  const actions = useMemo(
    () =>
      roleName === "admin" ? [...baseActions, ...adminActions] : baseActions,
    [roleName, baseActions, adminActions],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Действия
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col">
        {actions.map((node) => (
          <DropdownMenuItem key={node.key} asChild>
            {node}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
