import { CartridgeModelForm } from "../pages/cartridge/CartridgeModelForm";
import { CartridgeModelTable } from "../pages/cartridge/CartridgeModelTable";

export default function CartridgeModelLayout() {
  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <CartridgeModelForm />
      <CartridgeModelTable />
    </div>
  );
}
