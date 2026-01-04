import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useDialogFormShow } from "@/shared/kit/store/dialogFormShow/useDialogFormShow";
import { memo, useMemo } from "react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useProfileContext } from "@/shared/providers/index.ts";

export const ActionsForTable = memo(function ActionsForTable() {
  const toggleShow = useDialogFormShow((state) => state.toggleDialogForm);

  const { roleName } = useProfileContext();
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
