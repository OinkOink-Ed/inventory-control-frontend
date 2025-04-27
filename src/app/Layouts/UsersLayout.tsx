import { UserForm } from "../pages/users/UserForm";
// import { UsersTable } from "../pages/users/UsersTable";

export default function UsersLayout() {
  console.log("UsersLayout");

  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <UserForm />
      {/* <UsersTable /> */}
    </div>
  );
}
