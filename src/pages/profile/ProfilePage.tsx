import { ProfileCard } from "./ProfileCard";
import ProfileTable from "./ProfileTable";

export default function ProfilePage() {
  return (
    <div className="flex h-svh w-full">
      <div className="m-2 flex grow flex-col border">
        <div className="m-2 flex flex-col items-center border py-8">
          <div>Карточка пользователя</div>
          <ProfileCard />
        </div>
        <ProfileTable />
      </div>
    </div>
  );
}
