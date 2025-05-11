import { UsersTable } from "../pages/users/UsersTable";

export default function UsersLayout() {
  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <UsersTable />
    </div>
  );
}
