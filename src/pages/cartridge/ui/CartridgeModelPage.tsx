import { CartridgeModelTable } from "@pages/cartridge";
import { lazy } from "react";

export const CartridgeModelPageLazy = lazy(
  () => import("@/pages/cartridge/ui/CartridgeModelPage"),
);

export default function CartridgeModelPage() {
  return (
    <div className="flex h-svh w-full grow flex-col">
      <CartridgeModelTable />
    </div>
  );
}
