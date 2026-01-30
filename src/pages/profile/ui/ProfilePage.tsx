import { Spinner } from "@/ui/spinner";
import { ProfileCard } from "@pages/profile";
import { ProfileTable } from "@pages/profile";
import { lazy, Suspense } from "react";

export const ProfilePageLaze = lazy(
  () => import("@/pages/profile/ui/ProfilePage.tsx"),
);

export default function ProfilePage() {
  return (
    <div className="flex h-svh w-full">
      <div className="m-2 flex grow flex-col border">
        <div className="m-2 flex flex-col items-center border py-8">
          <div>Карточка пользователя</div>
          <Suspense key={"ProfileCard"} fallback={<Spinner />}>
            <ProfileCard />
          </Suspense>
        </div>
        <Suspense key={"ProfileTable"} fallback={<Spinner />}>
          <ProfileTable />
        </Suspense>
      </div>
    </div>
  );
}
