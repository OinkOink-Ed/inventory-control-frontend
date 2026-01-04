import { UserCardForm } from "@pages/user-card";
import { UserCardTable } from "@pages/user-card/index";
import { useParams } from "react-router";

export function UserCard() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="m-2 flex grow flex-col border">
      <div className="m-2 flex flex-col items-center border py-8">
        <div>Карточка пользователя</div>
        <UserCardForm id={Number(id)} />
      </div>
      <UserCardTable id={Number(id)} />
    </div>
  );
}
