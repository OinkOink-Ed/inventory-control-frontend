import { ProfileCard } from "../pages/profile/ProfileCard";
import ProfileTable from "../pages/profile/ProfileTable";

export default function ProfileLayout() {
  return (
    <div className="flex h-svh w-full">
      <div className="m-2 flex flex-grow flex-col border">
        <div className="m-2 flex flex-col items-center border py-8">
          <div>Карточка пользователя</div>
          <ProfileCard />
        </div>
        <ProfileTable />
      </div>
    </div>
  );
}
