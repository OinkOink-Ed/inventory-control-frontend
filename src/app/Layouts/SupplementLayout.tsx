import { SupplementForm } from "../pages/supplement/SupplementForm";
import { SupplementTable } from "../pages/supplement/SupplementTable";

export default function SupplementLayout() {
  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <SupplementForm />
      <SupplementTable />
    </div>
  );
}
